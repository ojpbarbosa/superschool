using SuperSchool.Data;
using SuperSchool.Models;
using Microsoft.AspNetCore.Mvc;

namespace SuperSchool.Controllers;

[ApiController]
[Route("api/students")]
public class StudentsController : ControllerBase
{
  // context para acessar o banco de dados
  private SchoolContext _context;

  // construtor para inicializar o context
  public StudentsController(SchoolContext context)
  {
    _context = context;
  }

  [HttpGet]
  public ActionResult<List<Student>> GetAll() // rota que retorna todos os estudantes
  {
    // retorna todos os estudantes em uma lista
    return _context.Students.ToList();
  }

  [HttpGet("{id}")] // rota get com paramêtro id
  public ActionResult<Student> GetById(string id) // paramêtro id
  {
    try
    {
      Student student = _context.Students.Find(id); // busca o estudante pelo id

      if (student == null)
      {
        return NotFound();
      }

      return Ok(student);
    }
    catch
    {
      return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from the database");
    }
  }

  [HttpPost] // rota post para criar um novo estudante
  public async Task<ActionResult> Post(Student student)
  {
    try
    {
      // adiciona o estudante ao contexto
      _context.Students.Add(student);

      // salva as mudanças no banco de dados de forma assíncrona
      if (await _context.Students.SaveChangesAsync() == 1)
      {
        // retorna o estudante criado
        return Created($"/api/students/{student.Id}", student);
      }
    }
    catch
    {
      return StatusCode(StatusCodes.Status500InternalServerError, "Error creating student");
    }

    return BadRequest();
  }

  [HttpPut("{id}")] // rota put para atualizar um estudante com o id
  public async Task<ActionResult> Put(string id, Student student)
  {
    try
    {
      // busca o estudante pelo id
      Student s = _context.Students.Find(id);

      // se o estudante não existir, retorna um erro 404 (not found)
      if (s == null)
      {
        return NotFound();
      }

      // atualiza os dados do estudante do banco de dados com os dados do estudante recebido na requisição
      s.EnrollmentNumber = student.EnrollmentNumber;
      s.Name = student.Name;
      s.Course = student.Course;

      // salva as mudanças no banco de dados de forma assíncrona
      if (await _context.Students.SaveChangesAsync() == 1)
      {
        return Ok(s); // retorna o estudante atualizado
      }
    }
    catch
    {
      return StatusCode(StatusCodes.Status500InternalServerError, "Error updating student");
    }

    return BadRequest();
  }

  [HttpDelete("{id}")] // rota delete para deletar um estudante com o id
  public async Task<ActionResult> Delete(string id) // paramêtro id
  {
    try
    {
      Student student = _context.Students.Find(id); // busca o estudante pelo id

      if (student == null) // se o estudante não existir, retorna um erro 404 (not found)
      {
        return NotFound();
      }

      _context.Students.Remove(student); // remove o estudante do contexto

      // salva as mudanças no banco de dados de forma assíncrona
      if (await _context.Students.SaveChangesAsync() == 1)
      {
        // return Ok(); // retorna um status 200 (ok)
        return NoContent(); // retorna um status 204 (no content)
      }
    }
    catch
    {
      return StatusCode(StatusCodes.Status500InternalServerError, "Error deleting student");
    }

    return BadRequest();
  }
}
