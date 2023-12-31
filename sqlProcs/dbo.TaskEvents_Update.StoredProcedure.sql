USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[TaskEvents_Update]    Script Date: 3/15/2023 2:50:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Andrew Phothisen>
-- Create date: <03/14/2023>
-- Description:	<Update record for TaskEvents>
-- Code Reviewer: Steve Nam


-- MODIFIED BY: author
-- MODIFIED DATE: mm/dd/yyyy
-- Code Reviewer:
-- Note:
-- =============================================
CREATE proc [dbo].[TaskEvents_Update]
							@ZoneId int
							,@EntityTypeId int
						    ,@EntityId int 
							,@TaskEventTypeId int
							,@NumericValue int
							,@BoolValue bit
							,@Text nvarchar(MAX)
							,@Payload nvarchar(255)
							,@ModifiedBy int
							,@Id int
							
/*

Select * 
from [dbo].[TaskEvents]

Declare 	@ZoneId int = 1
			,@EntityTypeId int = 1
			,@EntityId int = 1
			,@TaskEventTypeId int = 1
			,@NumericValue int = 1
			,@BoolValue bit = 'true'
			,@Text nvarchar(MAX) = 'something new'
			,@Payload nvarchar(255) = 'something'
			,@ModifiedBy int = 8
			,@Id int = 2
			
Execute dbo.TaskEvents_Update
							@ZoneId 
							,@EntityTypeId
						    ,@EntityId 
							,@TaskEventTypeId 
							,@NumericValue 
							,@BoolValue
							,@Text
							,@Payload 
							,@ModifiedBy
							,@Id

Select * 
from [dbo].[TaskEvents]
							
*/

as

Begin

Declare  @DateModified datetime2(7) = getutcdate()

UPDATE [dbo].[TaskEvents]
   SET [ZoneId] = @ZoneId 
      ,[EntityTypeId] = @EntityTypeId
      ,[EntityId] = @EntityId  
      ,[TaskEventTypeId] = @TaskEventTypeId 
      ,[NumericValue] = @NumericValue 
      ,[BoolValue] = @BoolValue 
      ,[Text] = @Text 
      ,[Payload] = @Payload
      ,[ModifiedBy] = @ModifiedBy 
      ,[DateModified] = @DateModified
 WHERE Id = @Id

END
GO
