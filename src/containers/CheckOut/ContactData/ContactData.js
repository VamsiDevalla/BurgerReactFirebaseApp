import React,{Component} from 'react'
import classes from './ContactData.css'
import Button from '../../../components/UI/Button/Button'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
class ContactData extends Component{
    state={
        orderForm:{
            name:{
                elementType:'input',
                elementConfig:{
                    type: 'text',
                    placeholder:'Your Name'
                },
                value:'',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            email:{
                elementType:'input',
                elementConfig:{
                    type: 'text',
                    placeholder:'Your Email'
                },
                value:'',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            street:{
                elementType:'input',
                elementConfig:{
                    type: 'text',
                    placeholder:'Street Address'
                },
                value:'',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            ZipCode:{
                elementType:'input',
                elementConfig:{
                    type: 'text',
                    placeholder:'Zip Code'
                },
                value:'',
                validation:{
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            deliveryType:{
                elementType:'select',
                elementConfig:{
                    options:[
                        {value: 'fastest' ,displayName: 'Fastest'},
                        {value: 'cheapest' ,displayName: 'Cheapest'}
                    ]
                },
                value:'',
                validation:{},
                valid:true
            }
        },
        loading:false,
        isFromValid: false
    }
    orderHandler = (event)=>{
        event.preventDefault()
        this.setState({loading:true})
        const formData = {}
        let delivery = null;
        for(let label in this.state.orderForm){
            if(label !== 'deliveryType'){
                formData[label] = this.state.orderForm[label].value
            }else{
                delivery = this.state.orderForm[label].value
            }
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer:{
                ...formData
            },
            deliveryMethod:delivery

        }
        axios.post('/orders.json',order)
            .then(res => {
                this.setState({loading:false})
                this.props.history.push('/')
            })
            .catch(err => {
                this.setState({loading:false})
            })
    }

    inputChangeHandler = (event,id) =>{
        const updatedForm = {...this.state.orderForm},
              updatedElement = {...updatedForm[id]}
        updatedElement.value = event.target.value
        updatedElement.valid = this.checkValidity(updatedElement.value,updatedElement.validation)
        updatedElement.touched = true
        updatedForm[id] = updatedElement

        let formIsValid = true
        for(let key in updatedForm){
            formIsValid = updatedForm[key].valid && formIsValid
        }
        this.setState({orderForm: updatedForm, isFromValid: formIsValid})
    }
    checkValidity(value,rules){
        let isValid = true
        if(!rules){
            return true
        }
        if(rules.required){
            isValid = value.trim() !== '' && isValid
        }
        if(rules.minLength && isValid){
            isValid = value.length >= rules.minLength && isValid
        }
        if(rules.maxLength ){
            isValid = value.length <= rules.maxLength && isValid
        }
        return isValid
    }

    render(){
        const formElementsArray = []
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id:key,
                config:this.state.orderForm[key]
            })
        }
        let form =(
            <form onSubmit={this.orderHandler} >
                {formElementsArray.map(formElement =>(
                    <Input label={formElement.id}
                           key={formElement.id}
                           elementType={formElement.config.elementType}
                           elementConfig={formElement.config.elementConfig}
                           value={formElement.config.value}
                           changed={(event)=>this.inputChangeHandler(event,formElement.id)}
                           inValid={!formElement.config.valid}
                           touched={formElement.config.touched}
                           shouldValidate={formElement.config.validation}
                    />
                ))}
                <Button  btnType='Success' disabled={!this.state.isFromValid}>Order</Button>
            </form>
        )
        if(this.state.loading){
            form = <Spinner/>
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter Your Details:</h4>
                {form}
            </div>
        )
    }
}

export default ContactData