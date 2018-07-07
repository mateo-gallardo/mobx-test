package com.mobxtest;

import android.app.NotificationManager;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;

import com.facebook.react.ReactActivity;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.wix.reactnativenotifications.core.AppLifecycleFacadeHolder;
import com.wix.reactnativenotifications.core.JsIOHelper;

public class MainActivity extends ReactActivity {
    //TODO: Use SharedPrefences or check if ReactNative has something to check if the app is active
    static boolean ACTIVE = false;

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "MobxTest";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        onNewIntent(getIntent());
        ACTIVE = true;
    }

    @Override
    protected void onStop() {
        super.onStop();
        ACTIVE = false;
    }

    @Override
    public void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
    }

    //Taken from https://stackoverflow.com/questions/43059560/how-can-i-emit-event-on-app-launch-from-notification-tap
    //Is 3 seconds too much?
    @Override
    protected void onResume() {
        super.onResume();
        final Handler handler = new Handler();
        handler.postDelayed(new Runnable() {
            @Override
            public void run() {
                Intent intent = getIntent();

                if (intent.hasExtra("notificationId")) {
                    Bundle extras = intent.getExtras();
                    Context context = getBaseContext();
                    closeNotificationBar(context);
                    cancelNotification(context, intent);

                    if (extras != null)	{
                        JsIOHelper jsHelper = new JsIOHelper();
                        jsHelper.sendEventToJS("notificationAction", extras, AppLifecycleFacadeHolder.get().getRunningReactContext());
                    }
                }
            }
        }, 3000);
    }

    //TODO: Extract to 'utilities' (same method is used in ActionCallbackHandler)
    private void cancelNotification(Context context, Intent intent) {
        int notId = intent.getIntExtra("notificationId", 0);
        NotificationManager notificationManager = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
        notificationManager.cancel(notId);
    }

    //TODO: Extract to 'utilities' (same method is used in ActionCallbackHandler)
    private void closeNotificationBar(Context context) {
        Intent it = new Intent(Intent.ACTION_CLOSE_SYSTEM_DIALOGS);
        context.sendBroadcast(it);
    }
}
