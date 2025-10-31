using ConcreteBeamTest.API.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddScoped<ConcreteCalculator>();
builder.Services.AddControllers();

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Use CORS - Move this before other middleware
app.UseCors("AllowAll");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

// Force listen on all interfaces for mobile access (0.0.0.0)
// This allows Android emulator (10.0.2.2) and physical devices to connect
app.Urls.Clear();
app.Urls.Add("http://0.0.0.0:5233");

Console.WriteLine("🚀 Server listening on http://0.0.0.0:5233 (accessible from mobile devices)");

app.Run();
