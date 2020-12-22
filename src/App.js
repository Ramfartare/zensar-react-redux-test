import './App.css';
/*Importing Custom Component */
import React, { useEffect } from 'react';
import UserProfile from './pages/user-profile/user-profile';
import CardList from './pages/cardlist/Cardlist';
import Sidebar from './pages/sidebar/sidebar';
import Card from './pages/card/card';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { GetStudentsAverage } from '../src/redux/actions/student/average-student';
import { getStudentsApi, getStudentsSuccess } from '../src/redux/actions/student/student';
import { sortObjectList } from './utils/sort-object-list.utils';

import logo from '../src/images/user-profile.png';

function App(props) {
  function handleFilterChange(v) {
    if (v) {
      props.dispatch(getStudentsSuccess(sortObjectList([...props.studentList], 'marks', v)));
    }
  }
  useEffect(() => {
    props.getStudentsApi();
    props.GetStudentsAverage();
    return () => {};
  }, []);

  return (
    <>
      <div>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-1 pl-0'>
              <Sidebar />
            </div>
            <div className='col-md-11'>
              <UserProfile />
              <div className='block-head'>
                <h1>Dashboard</h1>
                <h4>Mobile ux/ui design</h4>
              </div>
              <div className='row mt-4'>
                {props.averageStudentList.map((item, index) => {
                  return (
                    <div className='col-md-4' key={item.id}>
                      <Card className='card-body' student={item} logo={logo} />
                    </div>
                  );
                })}
              </div>

              <div className='col-md-6 mt-4'>
                <div className='card'>
                  <div className='card-header'>
                    <div className='row d-flex justify-content-end'>
                      <div className='col-md-6'>Average students by marks</div>
                      <div className='col-md-6 text-right'>
                        <select
                          className='form-select'
                          onChange={(e) => handleFilterChange(e.target.value)}
                        >
                          <option value=''>Sort</option>
                          <option value='asc'>Assending</option>
                          <option value='desc'>Decending</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <ul className='list-group list-group-flush'>
                    {props.studentList.map((item, index) => {
                      return <CardList className='mt-4' key={index} student={item} logo={logo} />;
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    studentList: state.Student.list,
    averageStudentList: state.AverageStudent.list,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      dispatch,
      getStudentsApi,
      GetStudentsAverage,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
