import React from 'react';
import swal from "sweetalert";

export default class Utils {


    static getToday = () =>{

        let date = new Date();
        let dd = date.getDate();
        let mm = date.getMonth() + 1;
        let yyyy = date.getFullYear();

        if(dd < 10){
            dd = '0'+dd;
        }
        if(mm < 10){
            mm = '0'+mm;
        }
        return yyyy+"-"+mm+"-"+dd;
    };

    static displayMessage = (icon, title, text) => {
        return swal({
            title: title,
            text: text,
            icon: icon,
            timer: 2000,
            buttons: false
        });
    };

    static getTime = (dateTime) => {
        return dateTime.slice(11, 21);
    };

    static status = [
        {label: 'Not started', value: 'Not started'},
        {label: 'In progress', value:'In progress'},
        {label: 'Paused', value: 'Paused'},
        {label: 'Completed', value: 'Completed'}
    ];

    static validateEmail(email) {
        if (email === null || email === undefined || email.lenth == 0)
            return false;

        var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    static isValid = (val) => {
        return (isNaN(+(val)));
    };

    static confirmDeleteMessage = (text) => {
        return swal({
            title: "Are you sure?",
            text: text,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
    };


}
