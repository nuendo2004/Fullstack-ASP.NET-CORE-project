USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[TaskEvents_Insert]    Script Date: 3/15/2023 2:50:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Andrew Phothisen>
-- Create date: <03/14/2023>
-- Description:	<Insert record for TaskEvents>
-- Code Reviewer: Steve Nam


-- MODIFIED BY: author
-- MODIFIED DATE: mm/dd/yyyy
-- Code Reviewer:
-- Note:
-- =============================================
CREATE proc [dbo].[TaskEvents_Insert]
							@ZoneId int
							,@EntityTypeId int
						    ,@EntityId int 
							,@TaskEventTypeId int
							,@NumericValue int
							,@BoolValue bit
							,@Text nvarchar(MAX)
							,@Payload nvarchar(255)
							,@CreatedBy int
							,@Id int output
							
/*

Select * 
from [dbo].[TaskEvents]

Declare 	@ZoneId int = 1
			,@EntityTypeId int = 1
			,@EntityId int = 1
			,@TaskEventTypeId int = 1
			,@NumericValue int = 1
			,@BoolValue bit = 'true'
			,@Text nvarchar(MAX) = 'something'
			,@Payload nvarchar(255) = 'something'
			,@CreatedBy int = 8
			,@Id int = 0
			
Execute dbo.TaskEvents_Insert
							@ZoneId 
							,@EntityTypeId 
						    ,@EntityId  
							,@TaskEventTypeId 
							,@NumericValue 
							,@BoolValue 
							,@Text 
							,@Payload
							,@CreatedBy
							,@Id

Select * 
from [dbo].[TaskEvents]							

*/

as

Begin

Declare  @DateCreated datetime2(7) = getutcdate()
		,@DateModified datetime2(7) = getutcdate()
		,@ModifiedBy int = @CreatedBy

INSERT INTO [dbo].[TaskEvents]
           ([ZoneId]
           ,[EntityTypeId]
           ,[EntityId]
           ,[TaskEventTypeId]
           ,[NumericValue]
           ,[BoolValue]
           ,[Text]
           ,[Payload]
           ,[CreatedBy]
           ,[ModifiedBy]
           ,[DateCreated]
           ,[DateModified])
     VALUES
			(@ZoneId 
			,@EntityTypeId 
			,@EntityId  
			,@TaskEventTypeId 
			,@NumericValue 
			,@BoolValue 
			,@Text 
			,@Payload
			,@CreatedBy
			,@ModifiedBy  
			,@DateCreated 
			,@DateModified)

Set @Id = SCOPE_IDENTITY()

END
GO
