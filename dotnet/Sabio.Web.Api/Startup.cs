using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Quartz.Impl;
using Quartz;
using Sabio.Models.AppSettings;
using Sabio.Web.Api.Hubs;
using Sabio.Web.Api.Hubs.TicTacToe;
using Sabio.Web.Core;
using Sabio.Web.StartUp;
using Sabio.Services;
using Sabio.Web.Api.QuartzJobs;
using Sabio.Services.Interfaces;

namespace Sabio.Web.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //services.AddMemoryCache();

            ConfigureAppSettings(services);

            DependencyInjection.ConfigureServices(services, Configuration);

            Cors.ConfigureServices(services);

            Authentication.ConfigureServices(services, Configuration);

            MVC.ConfigureServices(services);

            SPA.ConfigureServices(services);

            ConfigureJacobApp(services);

            ConfigureQuartz(services);

        }
        private void ConfigureJacobApp(IServiceCollection services)
        {
            services.AddSingleton<JobController>();
            services.AddSingleton<IJobControllerSettings, JobControllerSettings>();
            services.AddSingleton<IJobScheduleService, JobScheduleService>();
        }

        private async void ConfigureQuartz(IServiceCollection services)
        {
            var container = services.BuildServiceProvider();
            var jobFactory = new JobFactory(container);

            try
            {
                ISchedulerFactory schedulerFactory = new StdSchedulerFactory();

                IScheduler scheduler = await schedulerFactory.GetScheduler();

                scheduler.JobFactory = jobFactory;

                IJobDetail jobController = JobBuilder.Create<JobController>()
                    .WithIdentity("jobController", "jobControllerGroup")
                    .Build();

                ITrigger jobControllerTrigger = TriggerBuilder
                    .Create()
                    .WithIdentity("jobControllerTrigger", "jobControllerTriggerGroup")
                    .WithSimpleSchedule(x => x.WithIntervalInHours(1))
                    .ForJob(jobController)
                    .Build();

                bool doesJobControllerExist = await scheduler.CheckExists(jobController.Key);

                if (doesJobControllerExist)
                {
                    await scheduler.Start();
                }
                else
                {
                    if (!doesJobControllerExist)
                    {
                        await scheduler.ScheduleJob(jobController, jobControllerTrigger);
                    }

                    await scheduler.Start();
                }
            }
            catch
            {
                throw;
            }
        }
   

        private void ConfigureAppSettings(IServiceCollection services)
        {
            services.AddOptions();
            services.AddSignalR();
            services.Configure<SecurityConfig>(Configuration.GetSection("SecurityConfig"));
            services.Configure<JsonWebTokenConfig>(Configuration.GetSection("JsonWebTokenConfig"));
            services.Configure<AppKeys>(Configuration.GetSection("AppKeys"));
            services.Configure<AWSStorage>(Configuration.GetSection("AWSStorage"));
            services.Configure<GAOAuth>(Configuration.GetSection("GoogleAuth"));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            //per https://docs.microsoft.com/en-us/aspnet/core/migration/22-to-30?view=aspnetcore-3.1&tabs=visual-studio#routing-startup-code
            // static files should be called before UseRouting
            StaticFiles.Configure(app, env);

            app.UseRouting();
            Cors.Configure(app, env);
            Authentication.Configure(app, env);


            app.UseEndpoints(endpoints =>
            {

                endpoints.MapControllers();
                endpoints.MapHub<ChatHub>("/chat");
                endpoints.MapHub<TicTacToeHub>("/tictactoe");
            });

            if (!env.IsDevelopment())
            {
                app.UseHttpsRedirection();
                app.UseDeveloperExceptionPage();
                app.UseHsts();
            }

            MVC.Configure(app, env);

            SPA.Configure(app, env);

        }
    }
}