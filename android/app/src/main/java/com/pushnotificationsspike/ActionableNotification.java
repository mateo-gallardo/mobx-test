package com.mobxtest;

import android.app.Notification;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.res.Resources;
import android.os.Bundle;
import android.support.v7.app.NotificationCompat;
import android.util.Log;

import com.wix.reactnativenotifications.core.AppLaunchHelper;
import com.wix.reactnativenotifications.core.AppLifecycleFacade;
import com.wix.reactnativenotifications.core.JsIOHelper;
import com.wix.reactnativenotifications.core.notification.PushNotification;
import com.wix.reactnativenotifications.core.notification.PushNotificationProps;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class ActionableNotification extends PushNotification {
    public ActionableNotification(Context context, Bundle bundle, AppLifecycleFacade appLifecycleFacade, AppLaunchHelper appLaunchHelper, JsIOHelper jsIoHelper) {
        super(context, bundle, appLifecycleFacade, appLaunchHelper, jsIoHelper);
    }

    @Override
    protected PushNotificationProps createProps(Bundle bundle) {
        return new NotificationHelper(bundle);
    }

    protected NotificationHelper getProps() {
        return (NotificationHelper) mNotificationProps;
    }

    @Override
    protected int postNotification(Integer notificationId) {
        final PendingIntent pendingIntent = getCTAPendingIntent();

        if (notificationId == null) {
            notificationId = createNotificationId();
        }

        final Notification notification = buildNotification(pendingIntent, notificationId);
        return postNotification(notification, notificationId);
    }

    protected int createNotificationId() {
        return (int) System.nanoTime();
    }

    protected Notification buildNotification(PendingIntent intent, int notificationId) {
        return getNotificationBuilder(notificationId).build();
    }

    protected NotificationCompat.Builder getNotificationBuilder(int notificationId) {
        final Resources resources = mContext.getResources();
        final NotificationHelper props = getProps();

        // First, get a builder initialized with defaults from the core class.
        final NotificationCompat.Builder builder = new NotificationCompat.Builder(mContext);
        builder.setSmallIcon(R.drawable.ic_shopping_basket_black_24dp);
        builder.setContentTitle(props.getTitle());
        builder.setContentText(props.getBody());

        //TODO: Meter ifs de version de android por todos lados

        JSONArray actionsArray = getProps().getActions();
        Log.i("GCM", "cargando actions" + actionsArray.toString());
        for (int i = 0; i < actionsArray.length(); i++) {
            try {
                JSONObject jsonAction = actionsArray.getJSONObject(i);
                String title = jsonAction.getString("title");
                Intent actionCallbackIntent = new Intent(this.mContext, ActionCallbackHandler.class);
                actionCallbackIntent.putExtra("callback", jsonAction.getString("callback"));
                actionCallbackIntent.putExtra("data", getProps().asBundle());
                actionCallbackIntent.putExtra("notificationId", notificationId);
                PendingIntent pendingActionCallbackIntent = PendingIntent.getBroadcast(this.mContext, i, actionCallbackIntent, PendingIntent.FLAG_UPDATE_CURRENT);
                int iconId = resources.getIdentifier(jsonAction.getString("icon"), "drawable", mContext.getPackageName());
                NotificationCompat.Action action = new NotificationCompat.Action(iconId, title, pendingActionCallbackIntent);
                builder.addAction(action);
            } catch (JSONException ex) {
                //We sent an invalid JSON, this should never happen
            }
        }

        return builder;
    }
}
