import React, { Component } from 'react';
import LoginAuth from './LoginAuth';

class ListAuth  {
    getFeeds(cb) {
        LoginAuth.getAuthInfo((err, authInfo) => {
            var url = 'https://api.github.com/users' + authInfo.user.login + '/received_events';
            fetch(url, {
                headers : authInfo.header
            })
            .then((response) => response.json())
            .then((responseData) => {
                var feedItems = responseData.filter((ev) => ev.type == 'PushEvent');
                return cb(err , feedItems);
            })
        });
    }
}
export default new ListAuth;