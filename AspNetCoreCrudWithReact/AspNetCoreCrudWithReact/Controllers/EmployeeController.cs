using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AspNetCoreCrudWithReact.Models;

namespace AspNetCoreCrudWithReact.Controllers
{
    [Route("api/[controller]")]
    public class EmployeeController : Controller
    {
        EmployeeDataAccessLayer da = new EmployeeDataAccessLayer();

        [HttpGet]
        [Route("api/Employee/Index")]
        public IEnumerable<Employee> Index() {
            return da.GetEmployees();
        }
        //
        [HttpPost]
        [Route("api/Employee/Create")]
        public int Create(Employee employee) {
            return da.AddEmployee(employee);
        }
        //
        [HttpGet]
        [Route("api/Employee/Details/{id}")]
        public Employee Details(int id)
        {
            return da.GetEmployeeData(id);
        }
        //
        [HttpPut]
        [Route("api/Employee/Edit")]
        public int Edit(Employee employee)
        {
            return da.UpdateEmployee(employee);
        }
        //
        [HttpDelete]
        [Route("api/Employee/Delete/{id}")]
        public int Delete(int id)
        {
            return da.DeleteEmployee(id);
        }
        //
        [HttpGet]
        [Route("api/Employee/GetCityList")]
        public IEnumerable<Cities> Details() {
            return da.GetCities();
        }

    }
}
