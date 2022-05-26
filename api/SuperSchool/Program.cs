using Microsoft.EntityFrameworkCore;
using SuperSchool.Data;

var builder = WebApplication.CreateBuilder(args);

var MyAllowedSpecificOrigins = "_myAllowedSpecificOrigins";

builder.Services.AddCors(options =>
{
  options.AddPolicy(MyAllowedSpecificOrigins, builder =>
  {
    builder.WithOrigins("http://localhost").AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    builder.SetIsOriginAllowed(origin => new Uri(origin).Host == "localhost");
    builder.SetIsOriginAllowed(origin => true);
  });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<SchoolContext>(options =>
{
  options.UseSqlServer(builder.Configuration.GetConnectionString("SQLServer"));
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

// app.UseHttpsRedirection();

app.UseCors(MyAllowedSpecificOrigins);

app.UseAuthorization();

app.MapControllers();

app.Run();
