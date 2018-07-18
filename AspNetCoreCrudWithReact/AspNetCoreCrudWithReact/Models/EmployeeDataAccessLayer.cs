using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AspNetCoreCrudWithReact.Models
{
    public class EmployeeDataAccessLayer
    {
        StoredContext db = new StoredContext();


        public IEnumerable<Employee> GetEmployees()
        {
            try
            {
                return db.Employee.ToList();
            }
            catch
            {
                throw;
            }

        }
        //
        public int AddEmployee(Employee employee)
        {
            try
            {
                db.Employee.Add(employee);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }

        }
        //
        public int UpdateEmployee(Employee employee)
        {

            try
            {
                db.Entry(employee).State = EntityState.Modified;
                db.SaveChanges();
                return 1;

            }
            catch
            {

                throw;
            }
        }
        //
        public Employee GetEmployeeData(int id)
        {
            try
            {
                Employee employee = db.Employee.Find(id);
                return employee;
            }
            catch
            {

                throw;
            }

        }
        //
        public int DeleteEmployee(int id)
        {
            try
            {
                Employee em = db.Employee.Find(id);
                db.Employee.Remove(em);
                db.SaveChanges();
                return 1;
            }
            catch
            {

                throw;
            }

        }
        //
        public List<Cities> GetCities() {
            List<Cities> lstCities = new List<Cities>();
            lstCities = (from CityList in db.Cities select CityList).ToList();
            return lstCities;
        }


    }
}
