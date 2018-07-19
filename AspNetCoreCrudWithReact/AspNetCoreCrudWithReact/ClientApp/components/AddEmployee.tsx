import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { EmployeeData } from './FetchEmployee';


interface AddEmployeeDataState {
    title: string;
    loading: boolean;
    cityList: Array<any>;
    empData: EmployeeData;
}

export class AddEmployee extends React.Component<RouteComponentProps<{}>, AddEmployeeDataState>{
    constructor(props) {
        super(props);
        //
        this.state = { title: "", loading: true, cityList: [], empData: new EmployeeData() };
        //
        fetch('api/Employee/GetCityList')
            .then(rep => rep.json() as Promise<Array<any>>)
            .then(data => {
                this.setState({ cityList: data })
            });

        var empid = this.props.match.params["empid"];

        if (empid > 0) {
            fetch('api/Employee/Details/' + empid)
                .then(rep => rep.json() as Promise<EmployeeData>)
                .then(data => {
                    this.setState({ title: "Edit", loading: false, empData: data });
                });
        } else {
            this.state = { title: "Create", loading: false, cityList: [], empData: new EmployeeData() };
        }

        this.handlerSave = this.handlerSave.bind(this);
        this.handlerCancel = this.handlerCancel.bind(this);
    }
    //

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p> :
            this.renderCreateForm(this.state.cityList);

        return (<div>
            <h1>{this.state.title}</h1>
            <h3>Employee</h3>
            <hr />
            {contents}
        </div>);

    }
    //
    private handlerSave(e) {
        e.preventDefault();
        const data = new FormData(e.target);

        if (this.state.empData.employeeId) {
            fetch('api/Employee/Edit', {
                method: 'PUT',
                body: data
            }).then(rep => rep.json())
                .then((data) => {
                    this.props.history.push("/fetchemployee");
                });
        } else {
            fetch('api/Employee/Create', {
                method: 'POST',
                body: data
            }).then(rep => rep.json())
                .then((data) => {
                    this.props.history.push("/fetchemployee");
                });

        }

    }
    //
    private handlerCancel(e) {
        e.preventDefault();
        this.props.history.push("/fetchemployee");

    }
    //
    private renderCreateForm(cityList: Array<any>) {
        return (

            <form onSubmit={this.handlerSave} >
                <div className="form-group row" >
                    <input type="hidden" name="employeeId" value={this.state.empData.employeeId} />
                </div>
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="firstName">First Name</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="firstName" defaultValue={this.state.empData.firstName} required />
                    </div>
                </div >

                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="lastName">Last Name</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="lastName" defaultValue={this.state.empData.lastName} required />
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Gender">Gender</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="gender" defaultValue={this.state.empData.gender} required>
                            <option value="">-- Select Gender --</option>
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                        </select>
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Department" >Department</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="Department" defaultValue={this.state.empData.department} required />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="City">City</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="City" defaultValue={this.state.empData.city} required>
                            <option value="">-- Select City --</option>
                            {cityList.map(city =>
                                <option key={city.cityId} value={city.cityName}>{city.cityName}</option>
                            )}
                        </select>
                    </div>
                </div >
                <div className="form-group">
                    <button type="submit" className="btn btn-default">Save</button>
                    <button className="btn" onClick={this.handlerCancel}>Cancel</button>
                </div >
            </form >);

    }


}
