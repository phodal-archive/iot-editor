import React from 'react';


Util.listPorts(function(err, list){
  console.log(err, list);
})
class HomePage extends React.Component {

  render() {
    return (
      <div>Home Page</div>
    );
  }

}

export default HomePage;
