
Add scaffolding:
dotnet aspnet-codegenerator controller -name ItemController -m Item -dc Item.Data.ItemContext --relativeFolderPath Controllers --useDefaultLayout --referenceScriptLibraries --databaseProvider sqlite

create migration:
dotnet ef migrations add {YourMigrationName} --context OresAndCores_2Context

run migrations:
dotnet ef database update --context OresAndCores_2Context

openApi registration: http://localhost:5259/openapi/v1.json . 
swagger:  http://localhost:5259/swagger