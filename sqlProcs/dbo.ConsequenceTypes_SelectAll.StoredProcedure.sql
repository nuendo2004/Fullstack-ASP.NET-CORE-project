USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[ConsequenceTypes_SelectAll]    Script Date: 11/21/2022 11:20:56 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[ConsequenceTypes_SelectAll]

as 

/*


Execute dbo.ConsequenceTypes_SelectAll

*/

begin

SELECT [Id]
      ,[Name]
      ,[Description]


FROM [dbo].[ConsequenceTypes]

end


GO
