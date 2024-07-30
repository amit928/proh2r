package com.proh2r;

import android.content.ContentResolver;
import android.provider.Settings;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class DeveloperOptionsModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;

    public DeveloperOptionsModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "DeveloperOptionsModule";
    }

    @ReactMethod
    public boolean isDeveloperOptionsEnabled() {
        return Settings.Global.getInt(
                reactContext.getContentResolver(),
                Settings.Global.DEVELOPMENT_SETTINGS_ENABLED, 0
        ) != 0;
    }

    @ReactMethod
    public void checkDeveloperOptions(Callback callback) {
        ContentResolver contentResolver = this.reactContext.getContentResolver();
        int developerOptions = Settings.Secure.getInt(contentResolver, Settings.Global.DEVELOPMENT_SETTINGS_ENABLED, 0);
        callback.invoke(developerOptions == 1);
    }
}