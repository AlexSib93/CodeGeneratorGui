using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using Swashbuckle.AspNetCore.Filters;
using DataAccessLayer;
using Microsoft.EntityFrameworkCore;
using TerminalApi;
using BuisinessLogicLayer.Services;
using DataAccessLayer.Data;
using System.Reflection;
using Microsoft.Extensions.DependencyInjection;




var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

    string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
        builder =>
        {
            builder.WithOrigins("https://localhost:3000", "*")
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
        });
});
builder.Services.AddControllers();
builder.Services.AddDbContext<DataBaseContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
    {
        Description = "Standart Authorization header using Bearer scheme (\"bearer {token}\")",
        In = ParameterLocation.Header,
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey
    });
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Version = "v1",
        Title = "API",
        Description = "API для взаимодействия с системой"
    });

    options.OperationFilter<SecurityRequirementsOperationFilter>();
    var xmlFileName = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    options.IncludeXmlComments( Path.Combine(AppContext.BaseDirectory, xmlFileName));
});
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(opt =>
    {
        opt.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration.GetSection("Appsettings:Token").Value)),
            ValidateIssuer = false,
            ValidateAudience = false
        };
    });

builder.Services
    .AddScoped<IUserService, UserService>()
    .AddScoped<IUnitOfWork, MockUnit>()
    .AddScoped<IModelMetadataService, ModelMetadataService>()
    .AddScoped<IProjectMetadataService, ProjectMetadataService>()
    .AddScoped<IFormMetadataService, FormMetadataService>()
    .AddScoped<IPropMetadataService, PropMetadataService>()
    .AddScoped<IComponentMetadataService, ComponentMetadataService>()
    .AddScoped<IEnumMetadataService, EnumMetadataService>()
    .AddScoped<IEnumValueMetadataService, EnumValueMetadataService>();

builder.Services.AddHttpContextAccessor();
var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

MapsterConfig.AddMaps();

app.UseHttpsRedirection();

app.UseCors(MyAllowSpecificOrigins);

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();

