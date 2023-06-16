using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Sabio.Data;
using Sabio.Models.Interfaces;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Services.Security;
using Sabio.Web.Api.Hubs;
using Sabio.Web.Api.Hubs.TicTacToe;
using Sabio.Web.Api.StartUp.DependencyInjection;
using Sabio.Web.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Sabio.Web.StartUp
{
    public class DependencyInjection
    {
        public static void ConfigureServices(IServiceCollection services, IConfiguration configuration)
        {
            if (configuration is IConfigurationRoot)
            {
                services.AddSingleton<IConfigurationRoot>(configuration as IConfigurationRoot);   // IConfigurationRoot
            }

            services.AddSingleton<IConfiguration>(configuration);   // IConfiguration explicitly

            string connString = configuration.GetConnectionString("Default");
            // https://docs.microsoft.com/en-us/aspnet/core/fundamentals/dependency-injection?view=aspnetcore-2.2
            // The are a number of differe Add* methods you can use. Please verify which one you
            // should be using services.AddScoped<IMyDependency, MyDependency>();

            // services.AddTransient<IOperationTransient, Operation>();

            // services.AddScoped<IOperationScoped, Operation>();

            // services.AddSingleton<IOperationSingleton, Operation>();

            services.AddSingleton<IAuthenticationService<int>, WebAuthenticationService>();

            services.AddSingleton<Sabio.Data.Providers.IDataProvider, SqlDataProvider>(delegate (IServiceProvider provider)
            {
                return new SqlDataProvider(connString);
            }
            );
            services.AddSingleton<IAccessLogsService, AccessLogsService>();
            services.AddSingleton<IActorAccountServices, ActorAccountServices>();
            services.AddSingleton<IActorBatchService, ActorBatchService>();
            services.AddSingleton<IActorService, ActorService>();
            services.AddSingleton<IActorBatchService, ActorBatchService>();
            services.AddSingleton<IAdvertisementService, AdvertisementService>();
            services.AddSingleton<IAnalyticService, AnalyticService>();
            services.AddSingleton<IAvatarService, AvatarService>();
            services.AddSingleton<IBlogService, BlogService>();
            services.AddSingleton<IChatHubService, ChatHubService>();
            services.AddSingleton<ICommentService, CommentService>();
            services.AddSingleton<IConsequenceService, ConsequenceService>();
            services.AddSingleton<IDemoAccountService, DemoAccountService>();
            services.AddSingleton<IDictionary<string, PlayerConnection>>(opts => new Dictionary<string, PlayerConnection>());
            services.AddSingleton<IEmailsService, EmailsService>();
            services.AddSingleton<IEmployeeService, EmployeeService>();
            services.AddSingleton<IExternalLinkService, ExternalLinkService>();
            services.AddSingleton<IFaqService, FaqService>();
            services.AddSingleton<IFilesService, FilesService>();
            services.AddSingleton<IGoogleAnalyticsService, GoogleAnalyticsService>();
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddSingleton<IIdentityProvider<int>, WebAuthenticationService>();
            services.AddSingleton<IInviteMemberService, InviteMemberService>();
            services.AddSingleton<ILocationService, LocationService>();
            services.AddSingleton<ILookUpService, LookUpService>();
            services.AddSingleton<IMapUser, UserService>();
            services.AddSingleton<IMessagesService, MessagesService>();
            services.AddSingleton<INewsletterService, NewsletterService>();
            services.AddSingleton<INewsletterSubscriptionsService, NewsletterSubscriptionsService>();
            services.AddSingleton<INewsletterTemplateService, NewsletterTemplateService>();
            services.AddSingleton<IOrgAdminService, OrgAdminService>();
            services.AddSingleton<IOrganizationService, OrganizationService>();
            services.AddSingleton<IRatingService, RatingService>();
            services.AddSingleton<IReferenceTypesService, ReferenceTypesService>();
            services.AddSingleton<IRescueService, RescueService>();
            services.AddSingleton<ISecurityEventService, SecurityEventService>();
            services.AddSingleton<IShareStoryService, ShareStoryService>();
            services.AddSingleton<ISiteReferenceService, SiteReferenceService>();
            services.AddSingleton<IStripeService, StripeService>();
            services.AddSingleton<ISurveyAnswerService, SurveyAnswerService>();
            services.AddSingleton<ISurveyInstanceService, SurveyInstanceService>();
            services.AddSingleton<ISurveyService, SurveyService>();
            services.AddSingleton<ISurveyQuestionAnswerOptionService, SurveyQuestionAnswerOptionService>();
            services.AddSingleton<ISurveyQuestionService, SurveyQuestionService>();
            services.AddSingleton<ITaskEventsService, TaskEventsService>();
            services.AddSingleton<ITraineeAccountsService, TraineeAccountsService>();
            services.AddSingleton<ITraineeGroupService, TraineeGroupService>();
            services.AddSingleton<ITraineeService, TraineeService>();
            services.AddSingleton<ITrainingScheduleService, TrainingScheduleService>();
            services.AddSingleton<ITrainingUnitService, TrainingUnitService>();
            services.AddSingleton<ITrainingZonesServices, TrainingZonesServices>();
            services.AddSingleton<IUserService, UserService>();
            services.AddSingleton<IZoneConfigServices, ZoneConfigServices>();
            services.AddSingleton<IZoneGroupService, ZoneGroupService>();
            services.AddSingleton<IZonesService, ZonesService>();
            services.AddSingleton<IZoneTokenService, ZoneTokenService>();
            services.AddSingleton<IZoneTrackerService, ZoneTrackerService>();

            GetAllEntities().ForEach(tt =>
            {
                IConfigureDependencyInjection idi = Activator.CreateInstance(tt) as IConfigureDependencyInjection;

                //This will not error by way of being null. BUT if the code within the method does
                // then we would rather have the error loadly on startup then worry about debuging the issues as it runs
                idi.ConfigureServices(services, configuration);
            });
        }

        public static List<Type> GetAllEntities()
        {
            return AppDomain.CurrentDomain.GetAssemblies().SelectMany(x => x.GetTypes())
                 .Where(x => typeof(IConfigureDependencyInjection).IsAssignableFrom(x) && !x.IsInterface && !x.IsAbstract)
                 .ToList();
        }

        public static void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
        }
    }
}
