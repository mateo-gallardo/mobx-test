package com.mobxtest;

import android.os.Bundle;
import android.util.Log;

import com.wix.reactnativenotifications.core.notification.PushNotificationProps;

import org.json.JSONArray;
import org.json.JSONException;

public class NotificationHelper extends PushNotificationProps {

    private static String backgroundPrefix = "gcm.notification.";

    public NotificationHelper(Bundle bundle) {
        super(bundle);
    }

    @Override
    public String getTitle() {
        String title = getNotificationAttributeAsString("title");
        return title;
    }

    @Override
    public String getBody() {
        String body = getNotificationAttributeAsString("body");
        return body;
    }

    public JSONArray getActions() {
        try {
            String actions = getNotificationAttributeAsString("actions");
            return new JSONArray(actions);
        } catch (JSONException ex) {
            //We sent an invalid 'actions' array, so no actions will be added to the notification
            return new JSONArray();
        }
    }

    private String getNotificationAttributeAsString(String attr) {
        String actions;

        if (mBundle.containsKey("notification")) {
            Bundle notificationBundle = mBundle.getBundle("notification");
            actions = notificationBundle.getString(attr);
        } else {
            actions = mBundle.getString(backgroundPrefix + attr);
        }

        return actions;
    }

    @Override
    protected NotificationHelper copy() {
        return new NotificationHelper((Bundle) mBundle.clone());
    }
}