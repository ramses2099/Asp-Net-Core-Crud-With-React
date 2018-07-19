import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';


interface FetchEmployeeDataState {
    empList: EmployeeData[];
    loading: boolean

}

export class FetchEmployee extends React.Component<RouteComponentProps<{}>, FetchEmployeeDataState>{
    constructor() {
        super();
        this.state = { empList: [], loading: true };

        fetch('api/Employee/Index')
            .then(res => res.json() as Promise<EmployeeData[]>)
            .then(data => {
                this.setState({ empList: data, loading: false })
            });

        //
        this.handlerDelete = this.handlerDelete.bind(this);
        this.handlerEdit = this.handlerEdit.bind(this);
    }


    handlerDelete(id: number) {
        if (!confirm("Do you want to delete employee with Id: " + id))
            return;
        else
            fetch('api/Emplolyee/Delete/' + id, {
                method: 'delete'
            }).then(data => {
                this.setState({
                    empList: this.state.empList.filter((rec) => {
                        return (rec.employeeId != id);
                    })
                });
            });
    }

    handlerEdit(id: number) {
        this.props.history.push("/employee/edit/" + id);
    }
    
    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p> :
            this.renderEmployeeTable(this.state.empList);

        return (<div>
            <h1>Employee Data</h1>
            <p>This component demonstrates fetching Employee data from the server.</p>
            <p><Link to="/addemployee">Create New</Link></p>
            {contents}
        </div>);

    }

    private renderEmployeeTable(empList: EmployeeData[]) {
        return (<table className="table">
            <thead>
                <tr>
                    <th></th>
                    <th>Employee Id</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Gender</th>
                    <th>Department</th>
                    <th>City</th>
                </tr>
            </thead>
            <tbody>
                {empList.map(emp =>
                    <tr key={emp.employeeId}>
                        <td></td>
                        <td>{emp.firstName}</td>
                        <td>{emp.lastName}</td>
                        <td>{emp.gender}</td>
                        <td>{emp.department}</td>
                        <td>{emp.city}</td>
                        <td>
                            <a className="action" onClick={(id) => this.handlerEdit(emp.employeeId)}>Edit</a> | 
                            <a className="action" onClick={(id) => this.handlerDelete(emp.employeeId)}>Delete</a>
                        </td>
                    </tr>
                    )}            
            </tbody>
            </table>);
    }
    
}


export class EmployeeData {
    employeeId: number = 0;
    firstName: string ="";
    lastName: string = "";
    gender: string = "";
    city: string = "";
    department: string = "";
}
