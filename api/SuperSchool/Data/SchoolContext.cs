using Microsoft.EntityFrameworkCore;
using SuperSchool.Models;

namespace SuperSchool.Data;

public class SchoolContext : DbContext
{
  public SchoolContext(DbContextOptions<SchoolContext> options)
    : base(options)
  {
  }

  public DbSet<Student> Student { get; set; }
}
