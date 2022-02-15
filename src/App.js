import React, { useState } from 'react'
import { Router, Route, Switch } from 'react-router-dom';
import './styles/mainStyles.css';
import history from './pages/login/history.js'
import Login from './pages/login/login.js';

import PrivateRoute from './components/privateRoute/PrivateRoute'
/* Activate when adding security layer
import CareProvPrivateRoute from './components/privateRoute/careProvPrivateRoute.js';
import AdminPrivateRoute from './components/privateRoute/adminPrivateRoute.js';
*/

import CareProvSearch from './pages/careProv/careProvSearch.js';
import CareProvAddPatient from './pages/careProv/careProvAddPatient.js';
import CareProvPatientProfile from './pages/careProv/careProvPatientProfile.js';

import AdminSearch from './pages/admin/adminSearch.js';
import AdminPatientSearch from './pages/admin/adminPatientSearch.js';
import AdminAddPatient from './pages/admin/adminAddPatient.js';
import AdminPatientProfile from './pages/admin/adminPatientProfile.js';
import AdminAddCareProv from './pages/admin/adminAddCareProv.js';
import AdminCareProvProfile from './pages/admin/adminCareProvProfile.js';

import Secure from './pages/login/temp.js';
import Diagnosis from './pages/careProv/careProvDiagnosis';

function App() {

  const [activeUser, setActiveUser] = useState('');
  const [careProvider, setCareProvider] = useState({});
  const [patient, setPatient] = useState({});
  const [notes, setNotes] = useState({});
  
  return (

    <Router history={history}>
            <Switch>
             
             <Route path="/" exact render={(props) => <Login {...{setActiveUser, ...props}} />}/>

            {/* Deactivate when adding security layer */}
            <Route path="/care-prov-search" render={

               (props) => <CareProvSearch {...{activeUser, setPatient, setNotes, ...props}}/>

             }/>
            
             {/* Activate when adding security later
             <CareProvPrivateRoute path="/care-prov-search">
                <CareProvSearch />
             </CareProvPrivateRoute>
             */}

             <Route path="/care-prov-add-patient" component={CareProvAddPatient}/>
             <Route path="/care-prov-patient-profile" render={
             (props) => <CareProvPatientProfile {...{activeUser, patient, notes, ...props}}/>

             }
             />

            {/* Deactivate when adding security layer */}
             <Route path="/admin-search" render={
               (props) => <AdminSearch {...{setCareProvider, ...props}}/>
             }/>
             <Route path="/admin-patient-search" render={
               (props) => <AdminPatientSearch {...{activeUser, setNotes, setPatient, ...props}}/>
             }/>

             {/* Activate when adding security layer
             <AdminPrivateRoute path="/admin-search">
                <AdminSearch />
             </AdminPrivateRoute>
             */}
             
             <Route path="/admin-add-patient" component={AdminAddPatient}/>
             <Route path="/admin-patient-profile" render={(props) => <AdminPatientProfile {...{activeUser, patient, notes, ...props}}/>}/>
             <Route path="/admin-add-care-prov" component={AdminAddCareProv}/>
             <Route path="/admin-care-prov-profile" render={(props) => <AdminCareProvProfile {...{careProvider, ...props}}/>}/>

             <PrivateRoute path="/secure">
              <Secure />
             </PrivateRoute>
           
           </Switch>
    </Router>
  );
}

export default App;
