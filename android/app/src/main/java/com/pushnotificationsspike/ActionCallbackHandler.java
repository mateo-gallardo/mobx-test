package com.mobxtest;

import android.app.NotificationManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import com.wix.reactnativenotifications.core.AppLifecycleFacadeHolder;
import com.wix.reactnativenotifications.core.JsIOHelper;

public class ActionCallbackHandler extends BroadcastReceiver {

    @Override
    public void onReceive(Context context, Intent intent) {
        Bundle extras = intent.getExtras();

        if (MainActivity.ACTIVE) {
            cancelNotification(context, intent);
            closeNotificationBar(context);

            if (extras != null)	{
                JsIOHelper jsHelper = new JsIOHelper();
                jsHelper.sendEventToJS("notificationAction", extras, AppLifecycleFacadeHolder.get().getRunningReactContext());
            }
        } else {
            openApp(context, extras);
        }
    }

    private void openApp(Context context, Bundle extras) {
        Intent i = new Intent();
        i.putExtras(extras);
        i.setClass(context, MainActivity.class);
        i.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        context.startActivity(i);
    }

    //TODO: Extract to 'utilities' (same method is used in MainActivity)
    private void cancelNotification(Context context, Intent intent) {
        int notId = intent.getIntExtra("notificationId", 0);
        NotificationManager notificationManager = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
        notificationManager.cancel(notId);
    }

    //TODO: Extract to 'utilities' (same method is used in MainActivity)
    private void closeNotificationBar(Context context) {
        Intent it = new Intent(Intent.ACTION_CLOSE_SYSTEM_DIALOGS);
        context.sendBroadcast(it);
    }
}
