using Microsoft.EntityFrameworkCore;
using SuperSchool.Models;

namespace SuperSchool.Data;

public class SchoolContext : DbContext
{
  public SchoolContext(DbContextOptions<SchoolContext> options)
    : base(options)
  {
  }

  public DbSet<Student> Students { get; set; }

  public DbSet<Course> Courses { get; set; }
}
