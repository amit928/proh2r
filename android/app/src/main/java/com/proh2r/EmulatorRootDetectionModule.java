package com.proh2r;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import android.os.Build;

public class EmulatorRootDetectionModule extends ReactContextBaseJavaModule{

    public EmulatorRootDetectionModule(ReactApplicationContext reactContext) {
        super(reactContext);

    }

    @Override
    public String getName() {
        return "EmulatorRootDetection";
    }

    @ReactMethod
    public void isEmulatedAndRooted(com.facebook.react.bridge.Promise promise) {
        WritableMap result = new WritableNativeMap();
        result.putBoolean("isEmulated", isEmulatorByBuild());
        result.putBoolean("isRooted", isRooted());
        promise.resolve(result);
    }

    private boolean isEmulatorByBuild() {
        return (Build.FINGERPRINT.startsWith("generic")
                || Build.MODEL.contains("sdk")
                || Build.FINGERPRINT.startsWith("unknown")
                || Build.MODEL.contains("google_sdk")
                || Build.MODEL.contains("Emulator")
                || Build.MODEL.contains("Android SDK built for x86")
                || Build.MANUFACTURER.contains("Genymotion")
                || Build.BRAND.startsWith("generic") && Build.DEVICE.startsWith("generic")
                || "google_sdk".equals(Build.PRODUCT));
    }

    private boolean isRooted() {
        return findBinary("su");
    }

    private boolean findBinary(String binaryName) {
        boolean found = false;
        String[] places = {"/sbin/", "/system/bin/", "/system/xbin/", "/data/local/xbin/",
                "/data/local/bin/", "/system/sd/xbin/", "/system/bin/failsafe/", "/data/local/"};
        for (String where : places) {
            if (new java.io.File(where + binaryName).exists()) {
                found = true;
                break;
            }
        }
        return found;
    }

}
