import React from 'react'
import PropTypes from 'prop-types'
import CardHeader from '@mui/material/CardHeader'
import Avatar from '@mui/material/Avatar'
import CardContent from '@mui/material/CardContent'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import Card from '@mui/material/Card'

import Styles from '../styles/TourDialog.module.css';


const TourDialog = (props) => {

  function addDays( adddays) {
    var d = new Date();
    d.setDate(d.getDate() + adddays);
    console.log(d.toLocaleDateString('fa-IR'));
    var day = String(d.toLocaleDateString('fa-IR'));
  // return d;
  return  day;
}

  let today = new Date().toLocaleDateString('fa-IR');



  const {realstate,details } = props;
  const [loading, set_loading] = React.useState(false);
  const [dialog_status, set_dialog_status] = React.useState(1);
  const [value, setValue] = React.useState(null);
  const [tour_type, set_tour_type] = React.useState(false);
  const [tour_day, set_tour_day] = React.useState('1');
  const [tour_date, set_tour_date] = React.useState(today);
  const [tour_time, set_tour_time] = React.useState(null);
  const [phone, set_phone] = React.useState();
  const [digits, set_digits] = React.useState('');

  const [type_not_choosed_trigered, set_type_not_choosed_trigered] = React.useState(false);
  const [value_not_choosed_trigered, set_value_not_choosed_trigered] = React.useState(false);


  const onClickSubmit = () => {
    set_loading(true);
    console.log('submit clicked');

   
   

    if(!tour_type){
      set_type_not_choosed_trigered(true);
      set_loading(false);
    }else{
      set_type_not_choosed_trigered(false);
    }

    if(!value){

      set_value_not_choosed_trigered(true);
      set_loading(false);
     
        console.log('we need the fucking time of the day');
    }else{
      set_value_not_choosed_trigered(false);
      console.log(value);
      const time = value.getHours() + ':' + value.getMinutes();
      console.log(time); // 👉️ 13:27
      set_tour_time(time); 

      

      
      set_loading(false);
      set_dialog_status(2);
    }


  }

  const onClickTourType = ({type})=> {
    console.log(type);

    set_tour_type(type);
  }

  const onClickTourDay = ({day})=> {
    console.log(day);

    set_tour_day(day);
  }

  const renderCardHeader = () => {
    return(
      <CardHeader
        className={Styles["tour-dialog-wrapper-header"]}
        avatar={

          <Avatar alt={realstate.name}  src={realstate.profile_url}
          sx={{ width: 70, height: 70 }}
           />

        }


        title={realstate.name +' ' +  realstate.family}
        subheader="مشاور شما در بازدید از این ملک"

      />
    )
  }

  const handleChangeInput = (e) => {
    console.log('form changed');
    console.log(e.target.value);
    if(e.target.value){
      var phone = e.target.value;
      set_phone(phone);

    }else{

    }
  }


  const handleChangeInput2 = (e) => {
    console.log('digits now is');
    console.log(e.target.value);
    if(e.target.value){
      var digits = e.target.value;
      set_digits(digits);

    }else{

    }
  }


  const onClickSendCode = () => {

    if(phone.length !== 11){
      alert('شماره موبایل را صحیح وارد کنید');
      return;
    }



    set_loading(true);
   

    axios({ 
           method:'post',
           // url:'https://irabist.ir/api/register-login',
           url:'https://api.boomlex.ir/webauth/visit-register',

           params: {
            phone: phone,
            tour_time:value,
            tour_type:tour_type,
            tour_day:tour_day,
           
            worker_id: details.id,
            user_agent : realstate.id


             },
     })
     .then(function (response) {

       console.log('sms sended ');
       console.log(response);
       if(response.status == 200){
          console.log('sms sended successfully');
          set_dialog_status(3);
       }else{
         console.log('something wrong with sms sending');
       }
       set_loading(false);
      })
  }

  const onClickFinish = () => {

  

    var code = parseInt(digits);
    console.log('the code in finish part is:::');
    console.log(code);

   if(digits.length != 5 ){
            console.log('the digits must be 5 number');
          alert('کد تایید باید ۵ رقم باشد')
   }else{
     axios({
           method:'post',
            url:'https://api.boomlex.ir/webauth/visit-verify',
            params: {
            phone: phone,
            code: code,
            password: 'ddr007'
             },
     })
     .then(function (response) {
       console.log(response);

       if(response.data.status == 'success'){
         console.log('code is right and thanks');
         set_dialog_status(4);

       }else if (response.data.status == 'useless') {

         console.log('your code is useless');
         alert('! کد تایید شما دارای اعتبار نیست')

       }else{

         console.log('your code is wrong');
        alert('! کد تایید شما درست نیست')

       }






      })



   }












  }

  const onClickCloseModal = () => {
    props.handleClose();
  }


  const submitButton = () => { 

    if(loading){
      return(
        <div className={Styles['tour-dialog-submit-wrapper']} >
        <Grid item xs={12} md={12}>
          <div className={Styles["submit-button"]}  >
            <p>
               ...
            </p>
          </div>
        </Grid>
      </div>
      )
    

    }
    else if(dialog_status == 1){

      return(
        <div className={Styles['tour-dialog-submit-wrapper']} >
          <Grid item xs={12} md={12}>
            <div className={Styles["submit-button"]}   onClick={onClickSubmit}>
              <p>
                  ثبت درخواست
              </p>
            </div>
          </Grid>
        </div>
      )

    }else if (dialog_status == 2) {
      return(
        <div className={Styles['tour-dialog-submit-wrapper']} >
          <Grid item xs={12} md={12}>
            <div className={Styles["submit-button"]}   onClick={onClickSendCode}>
              <p>
                  دریافت کد تایید
              </p>
            </div>
          </Grid>
        </div>
      )

    }

    else if (dialog_status == 3) {
      return(
        <div className={Styles['tour-dialog-submit-wrapper']} >
          <Grid item xs={12} md={12}>
            <div className={Styles["submit-button"]}   onClick={onClickFinish}>
              <p>
                  ثبت نهایی
              </p>
            </div>
          </Grid>
        </div>
      )

    }

    else if (dialog_status == 4) {
      return(
        <div className={Styles['tour-dialog-finish-wrapper']} >
          <Grid item xs={12} md={12}>
            <div className={Styles["submit-button"]}   onClick={onClickCloseModal}>
              <p>
                  متوجه شدم
              </p>
            </div>
          </Grid>
        </div>
      )

    }

    else{

    }
  }

  const renderTour = () => {
    if(dialog_status == 1){
      return(
        <>
        <div className={Styles["tour-dialog-button-wrapper"]}>
          <Box component="div" sx={{ p: 2, border: type_not_choosed_trigered ? '2px dashed red' : '1px dashed gray',margin:'20px' }}>
          <p>لطفا نوع بازدیدتان را انتخاب کنید</p>
            <Grid container spacing={1}>
              <Grid item xs={6} md={6}>
                <Button
                  onClick={()=> onClickTourType({type:'real'})}
                  className={Styles["worker-detail-button"]}

       variant={
                (tour_type=='real' ? "contained" : "outlined")
              }

                 >بازدید حضوری</Button>
              </Grid>
              
              <Grid item xs={6} md={6}>
                <Button onClick={()=> onClickTourType({type:'call'})} className={Styles['worker-detail-button']}
                  variant={
                           (tour_type=='call' ? "contained" : "outlined")
                         }
                  >تماس تصویری</Button>
              </Grid>
              </Grid>
          </Box>

        </div>

        <div className={Styles["tour-dialog-date-picker-wrapper"]} >
       
       {renderDatePicking()}
          
          <div style={{border: value_not_choosed_trigered ? '2px dashed red' : '0px solid red'}} className={Styles["tour-dialog-time-picker-wrapper"]} >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
            <p>ساعت بازدید را انتخاب کنید</p>
              <TimePicker
                label="انتخاب ساعت"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>

          </div>
      </>
      )
    }else if (dialog_status ==2) {
      return(
        <div>
          <Form>
      <Form.Group className="mb-3" controlId="formPhone">
        <Form.Label>شماره موبایل خود را وارد کنید</Form.Label>
      <Form.Control
        type="number"
        placeholder="09********"
        onChange={handleChangeInput}
        // value= {phone}
       />
        <Form.Text className="text-muted">
        با وارد کردن شماره شما اجازه تماس از سمت همکاران بوملکس را خواهید داد 
        </Form.Text>
      </Form.Group>
    </Form>
        </div>
      )

    }else if (dialog_status ==3) {
      return(
        <div>
          <Form>
      <Form.Group className="mb-3" controlId="formvalidationCode">
        <Form.Label>کد تایید ۵ رقمی ارسال شده به شماره موبایل خود را وارد کنید</Form.Label>
      <Form.Control
        type="number"
        placeholder="- - - - -"
        onChange={handleChangeInput2}
        value={digits}
       />
        <Form.Text className="text-muted">
       
        </Form.Text>
      </Form.Group>
    </Form>
        </div>
      )

    }else if (dialog_status ==4) {
      return(
        <div>
          <Form>
            <Form.Group className="mb-3" controlId="formvalidationCode">
              <p style={{color:'green'}}>  درخواست شما با موفقیت در بوملکس ثبت شد و در اختیار مشاور قرار خواهد گرفت </p>
            
              <p style={{color:'black'}}>
              ممکن است قبل از بازدید مشاوران ما با شما تماس بگیرند
              </p>
            </Form.Group>
          </Form>
        </div>
      )

    }
  }


 const renderDatePicking = () => {
    if(1){
      return(
        <>
        <p>روز بازدیدتان را انتخاب کنید</p>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Card
              onClick={()=> onClickTourDay({day:'1'})}
              className={
                 "date-picker " +
                 (tour_day=='1' ? "date-picker-active " : "date-picker-deactive ") +
                 " "
               }

                sx={{ height: 100 }}>
              <CardContent>
                  <p>فردا</p>
                <p>{ addDays(1)}</p>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card
              onClick={()=> onClickTourDay({day:'2'})}
              className={
                 "date-picker " +
                 (tour_day=='2' ? "date-picker-active " : "date-picker-deactive ") +
                 " "
               }
               sx={{ height: 100 }}>
              <CardContent>
                <p>پس فردا</p>
              <p>{ addDays(2)}</p>

              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card
              onClick={()=> onClickTourDay({day:'3'})}
              className={
                 "date-picker " +
                 (tour_day=='3' ? "date-picker-active " : "date-picker-deactive ") +
                 " "
               }
              sx={{ height: 100 }}>
              <CardContent>
                  <p>سه روز دیگر</p>
                <p>{ addDays(3)}</p>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        </>
      )
    }
  }



  return (
    <div className={Styles["tour-dialog-wrapper"]} >

        {renderCardHeader()}


        {renderTour()}





        {submitButton()}
        


    </div>
  )
}

export default TourDialog
