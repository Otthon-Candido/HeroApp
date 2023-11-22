using Microsoft.EntityFrameworkCore;
using SuperHeroApp.Business;
using SuperHeroApp.Business.Interfaces;
using SuperHeroApp.Data;
using SuperHeroApp.Repository.Interfaces;
using Transcom.Infra.Middlewares;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors(options =>
   {
       options.AddPolicy("AllowLocalhost4200",
           builder => builder.WithOrigins("http://localhost:4200", "https://localhost:4200")
                             .AllowAnyHeader()
                             .AllowAnyMethod());
   });
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IHeroesBusiness, HeroesBusiness>();
builder.Services.AddScoped<IHeroesRepository, HeroesRepository>();
builder.Services.AddScoped<ISuperPowersBusiness, SuperPowersBusiness>();
builder.Services.AddScoped<ISuperPowerRespository, SuperPowerRespository>();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());



var connectionString = builder.Configuration.GetConnectionString("SuperHeroConnection");



builder.Services.AddEntityFrameworkNpgsql()
.AddDbContext<SuperHeroAppContext>(options =>
options.UseNpgsql(connectionString));



var app = builder.Build();
app.UseMiddleware<ExceptionHandlingMiddleware>();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();
app.UseCors("AllowLocalhost4200");
app.MapControllers();

app.Run();
