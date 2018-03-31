import React, { Component } from 'react';
import buffer from 'buffer';
import _ from 'lodash';
import { AsyncStorage } from 'react-native';

const authKey = 'auth',
      userKey = 'user'

class LoginAuth  {
    getAuthInfo(cb) {
        AsyncStorage.multiGet([authKey, userKey], (err, val) => {
            if(err)
                return cb(err);
            if(!val)
                return cb();
            var zippedObj = _.zipObjectDeep(val);
            if(!zippedObj[authKey])
                return cb();
            var authInfo = {
                header: {
                    Authorization : 'Basic ' + zippedObj[authKey]
                },
                user : (zippedObj[userKey])
            }
            return cb(null, authInfo);
        })
    }
    loginCheck(info, cb) {
        var encoded = buffer.Buffer(info.username + ':' + info.password).toString('base64');
        fetch('https://api.github.com/user', {
            headers: {
                'Authorization' : 'Basic ' + encoded
            }
        })
        .then((response) => {
            if(response.status >= 200 && response.status < 300)
                return response;
            else {
                throw {
                    bad : response.status == 401,
                    Unknown: response.status != 401
                }
            }
            throw 'Unknown Error';
        })
        .then((response) => {
            return response.json();
        })
        .then ((result) => {
            AsyncStorage.multiSet([
                [authKey, encoded],
                [userKey, JSON.stringify(result)],
            ], err => {
                if(err)
                    throw err;
                return cb({success: true});
            })
        })
        .catch((err) => {
            return cb(err);
        })
    }
}

export default new LoginAuth;