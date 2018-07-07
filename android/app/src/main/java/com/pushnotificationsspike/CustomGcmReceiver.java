package com.mobxtest;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import com.google.android.gms.gcm.GcmReceiver;
import com.wix.reactnativenotifications.core.notification.IPushNotification;
import com.wix.reactnativenotifications.core.notification.PushNotification;

import static com.wix.reactnativenotifications.Defs.LOGTAG;

public class CustomGcmReceiver extends GcmReceiver {

    @Override
    public void onReceive(Context context, Intent intent) {
        try {
            Bundle bundle = intent.getExtras();
            final IPushNotification notification = PushNotification.get(MainApplication.getContext(), bundle);
            notification.onReceived();
        } catch (IPushNotification.InvalidNotificationException e) {
            // A GCM message, yes - but not the kind we know how to work with.
            Log.v(LOGTAG, "GCM message handling aborted", e);
        }
    }
}
