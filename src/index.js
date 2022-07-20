import React, {Fragment} from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

class Getdata extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: "",
      color: "",
      nameErrorMessage: "",
      colorErrorMessage: "",
      formRecordId: "null",
      isFormUpdate: false,
      items: []
    };
  }

  /** Handling the input change event Start */
  handleInputChange = (event) => {
    
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    if(name == 'userName')
    {
      if(value == '')
      {
        var nameErrMsg = "Name can not be blank...";
        this.setState({
          userName: "",
          nameErrorMessage : nameErrMsg
        });
      }
      else
      {
        if(this.state.items.length > 0)
        {
          for(var i=0;i<this.state.items.length;i++) {
            
            if(this.state.formRecordId == i)
            {
              this.setState({
                userName: value,
                nameErrorMessage : ""
              });
              return;
            }
            else
            {
              if(this.state.items[i].userName == value)
              {
                var nameErrMsg = "Name has already been taken, enter another name...";
                this.setState({
                  userName: value,
                  nameErrorMessage : nameErrMsg
                });
                return;
              }
              else
              {
                this.setState({
                  userName: value,
                  nameErrorMessage : ""
                });
                return;
              }
            }
          }
        }
        else
        {
          this.setState({
            userName: value,
            nameErrorMessage : ""
          });
        }
      }   
    }    
    else if(name == 'color' && value == '')
    {
      var colorErrMsg = "Select color...";
      this.setState({
        color: "",
        colorErrorMessage : colorErrMsg
      }); 
    }
    else
    {
      this.setState({
        nameErrorMessage : "",
        colorErrorMessage : "",
        [name]: value
      });
    }
  }
  /** Handling the input change event End */

  /** Handling the form submit event Start */
  handleSubmit = (event) => {
    event.preventDefault();
    if(this.state.userName == '')
    {
      var nameErrMsg = "Name can not be blank...";
      this.setState({
        nameErrorMessage : nameErrMsg
      }); 
    }
    else if(this.state.color == '')
    {
      var colorErrMsg = "Select color...";
      this.setState({
        colorErrorMessage : colorErrMsg
      }); 
    }
    else 
    {
      var subItem = [];
      subItem['userName'] = this.state.userName;
      subItem['color'] = this.state.color;
      var items = this.state.items;
      var err = 0;
      if(items.length > 0)
      {
        for(var i=0;i<items.length;i++) {
          if(items[i].userName == this.state.userName)
          {
            if(this.state.formRecordId == i)
            {
              this.setState({
                nameErrorMessage : ""
              });
              err = 0;
            }
            else
            {
              var nameErrMsg = "Name has already been taken, enter another name...";
              this.setState({
                nameErrorMessage : nameErrMsg
              });
              err = 1;
              return false;
            }            
          }
          else
          {
            err = 0;
            this.setState({
              nameErrorMessage : ""
            });
          }
        }
      }
      if(err == 0)
      {
        if(this.state.formRecordId == 'null')
        {
          items.push(subItem);
          this.setState({
            items: items,
            userName: "",
            color: "",
            nameErrorMessage : ""
          });
        }
        else
        {   
          items[this.state.formRecordId]  = subItem;
          this.setState({
            items: items,
            userName: "",
            color: "",
            formRecordId: "null",
            isFormUpdate: false,
            nameErrorMessage : ""
          });
        }
      }
    }   
  }
  /** Handling the form submit event End */

  /** Handle data update Start */
  handleItemChange(i, event) {
    var items = this.state.items;   
    this.setState({
      userName: items[i]['userName'],
      color: items[i]['color'],
      isFormUpdate: true,
      formRecordId: i
    });
  } 
  /** Handle data update End */

  /** Handle data delete Start */
  handleItemDeleted(i) {
    if(window.confirm('Delete the item?')){
      var items = this.state.items;
      items.splice(i, 1);
      this.setState({
        items: items
      });
    }
  }
  /** Handle data delete End */

  /** table data managing Start */
  renderRows() {
    var context = this;
    return  this.state.items.map(function(o, i) {
      return (
        <tr key={"item-" + i}>
          <td>{o['userName']}</td>
          <td>{o['color']}</td>
          <td><button onClick={context.handleItemChange.bind(context, i)}>Edit</button> | <button onClick={context.handleItemDeleted.bind(context, i)}>Delete</button></td>          
        </tr>
      );
    });
  }
  /** table data managing End */

  /** Counter balls management Start */
  colorCounter(colorName){
    return this.state.items.reduce(function (n, data) {
        return n + (data.color == colorName);
    }, 0);
  }
  /** Counter balls management End */

  render() {
    const isFormUpdateTrue = this.state.isFormUpdate;
    let buttonName;
    if (isFormUpdateTrue) {
      buttonName = 'Update';
    } else {
      buttonName = 'Save';
    }
    return (
      <Fragment>        
        <Forminputs handleInputChange={this.handleInputChange} handleSubmit={this.handleSubmit} userName={this.state.userName} color={this.state.color} nameErrMsg={this.state.nameErrorMessage} colorErrMsg={this.state.colorErrorMessage} buttonName={buttonName} />
        <Tabledata tableBody={this.renderRows()} />
        <Counterballs redCounterBall={this.colorCounter('red')} greenCounterBall={this.colorCounter('green')} BlueCounterBall={this.colorCounter('blue')} />
    </Fragment>
    );
  }
}
class Forminputs extends React.Component {
  render() {
    return (
      <div className='dataForm'>
        <form onSubmit={this.props.handleSubmit}>
          <label>
            Name:
            <input
              name="userName"
              type="text"
              onChange={this.props.handleInputChange}
              value={this.props.userName}
              />
          </label>
          <span className="err">{this.props.nameErrMsg}</span>
          <br />
          <label>
            Color:
            <select name="color" value={this.props.color} onChange={this.props.handleInputChange}>
              <option value="">Select color</option>
              <option value="red">Red</option>
              <option value="green">Green</option>
              <option value="blue">Blue</option>
            </select>          
          </label>
          <span className="err">{this.props.colorErrMsg}</span>
          <input type="submit" value={this.props.buttonName} name={this.props.buttonName} />  
          <input type="reset" value="Clear"  />
        </form>
      </div>
    );
  }
}
class Tabledata extends React.Component{
  render(){
    return(
      <div className="dataTable">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Color</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.props.tableBody}
          </tbody>
        </table>
      </div>
    );
  }
}
class Counterballs extends React.Component{
  render(){
    return(
      <div className='counters'>
        <div className='redCounter'>{this.props.redCounterBall}</div>
        <div className='greenCounter'>{this.props.greenCounterBall}</div>
        <div className='blueCounter'>{this.props.BlueCounterBall}</div> 
      </div>
    );
  }
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Getdata />);