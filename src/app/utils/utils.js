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

    static validateName(text) {
        let reg = /^[A-zÀ-ú]+(?:['-][A-zÀ-ú]+)*$/; //Validates name with accented letters
        return reg.test(text.trim());
    };

    static currencies = [
        {
            value: 'GMD',
            label: 'GMD',
        },
        {
            value: 'CFA',
            label: 'CFA',
        },
        {
            value: 'USD',
            // label: '$',
            label: 'USD',
        },
        {
            value: 'EUR',
            // label: '€',
            label: 'EUR',
        },
        {
            value: 'JPY',
            // label: '¥',
            label: 'JPY',
        },
    ];

    static dateFormat = (n) => {
        if (!n)
            return '';
        if (n === 'none')
            return n;
        //Used for date display
        var opts = {};
        opts.day = "numeric";
        // opts.weekday = "long";
        opts.year = "numeric";
        opts.month = "numeric";
        var lang = navigator.language || navigator.userLanguage;

        n = n.slice(0, 10);
        let _tmp = n.split('-');

        let dd = _tmp[2];
        let mm = _tmp[1] - 1;
        let yyyy = _tmp[0];
        var event = new Date(Date.UTC(yyyy, mm, dd));

        return event.toLocaleDateString(lang, opts);
    };


}
