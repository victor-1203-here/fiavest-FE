import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import ProtectedRoute from './components/protected';
import Clients from './Pages/clients';
import Login from './Pages/loginPage';
import Posting from './Pages/posting';
import Users from './Pages/user';
import PostDetails from './components/Post/postDetails';
import EditPosting from './components/Post/editPosting';
import AddClient from './components/Clients/addClient';
import ClientDetail from './components/Clients/clientDetail';
import EditClient from './components/Clients/editClient';
import DeleteClient from './components/Clients/deleteClient';
import AddPosting from './components/Post/addPosting';
import DeletePost from './components/Post/deletePost';
import AddUser from './components/Users/addUser';
import UserDetail from './components/Users/userDetail';
import EditUser from './components/Users/editUser';
import DeleteUser from './components/Users/deleteUser';
import ResetPage from './Pages/resetPass';
import DeleteNotFound from './components/deleteNotFound';
import ImageSwiper from './Pages/imgSwipe';
import AddImage from './components/ImagesSwipe/addImage';
import ViewImage from './components/ImagesSwipe/viewImage';
import DeleteImage from './components/ImagesSwipe/deleteImage';
import EmaChart from './Pages/emaChart';
import AddChart from './components/Charts/addChart';
import ViewChart from './components/Charts/ViewChart';
import DeleteChart from './components/Charts/deleteChart';

function App() {

  return (
      <Router>
          <Route exact path='/login' component={Login} />
          <Route path='/resetPass' component={ResetPage} />

          <ProtectedRoute exact path='/' component={Clients} />
          <ProtectedRoute path='/addClient' component={AddClient} />
          <ProtectedRoute path='/client/:id' component={ClientDetail} />
          <ProtectedRoute path='/editClient/:id' component={EditClient} />
          <ProtectedRoute path='/deleteClient/:id' component={DeleteClient} />

          <ProtectedRoute path='/users' component={Users} />
          <ProtectedRoute path='/addUser' component={AddUser} />
          <ProtectedRoute path='/user/:id' component={UserDetail} />
          <ProtectedRoute path='/editUsers/:id' component={EditUser} />
          <ProtectedRoute path='/deleteUser/:id' component={DeleteUser} />

          <ProtectedRoute exact path='/posting' component={Posting} />
          <ProtectedRoute path='/addPost' component={AddPosting} />
          <ProtectedRoute path='/post/:id' component={PostDetails} />
          <ProtectedRoute path='/editPost/:id' component={EditPosting} />
          <ProtectedRoute path='/deletePost/:id' component={DeletePost} />

          <ProtectedRoute path='/imageSwiper' component={ImageSwiper} />
          <ProtectedRoute path='/addImage' component={AddImage} />
          <ProtectedRoute path='/viewImage/:id' component={ViewImage} />
          <ProtectedRoute path='/deleteImage/:id' component={DeleteImage} />

          <ProtectedRoute path='/charts' component={EmaChart} />
          <ProtectedRoute path='/addCharts' component={AddChart} />
          <ProtectedRoute path='/viewChart/:id' component={ViewChart} />
          <ProtectedRoute path='/deleteChart/:id' component={DeleteChart} />

          <ProtectedRoute path='/deleteNotFound/:id' component={DeleteNotFound} />
      </Router>
  );
}

export default App;
