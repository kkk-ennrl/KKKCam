package kkk.ennrl.cam;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.res.Resources;
import android.os.Bundle;
import android.view.View;
import android.view.WindowManager;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_LAYOUT_STABLE | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN);
        setContentView(R.layout.activity_main);

        getWindow().setFlags(WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS, WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS);

        WebView webView = (WebView) findViewById(R.id.webview);

        webView.getSettings().setJavaScriptEnabled(true);
        webView.getSettings().setDomStorageEnabled(true);


        class WebAppInterface {
            final Context mContext;


            /**
             * Instantiate the interface and set the context
             */
            WebAppInterface(Context c) {
                mContext = c;
            }

            /**
             * Show a toast from the web page
             */
            @JavascriptInterface
            public void showToast(String toast) {
                Toast.makeText(mContext, toast, Toast.LENGTH_SHORT).show();
            }

            @JavascriptInterface
            public int getStatusBarHeight() {
                int result = 0;
                int resourceId = getResources().getIdentifier("status_bar_height", "dimen", "android");
                if (resourceId > 0) {
                    result = getResources().getDimensionPixelSize(resourceId);
                }
                return result;
            }

            @JavascriptInterface
            public int getNavigationBarHeight() {
                Resources resources = mContext.getResources();
                int resourceId = resources.getIdentifier("navigation_bar_height", "dimen", "android");
                if (resourceId > 0) {
                    return resources.getDimensionPixelSize(resourceId);
                }
                return 0;
            }

        }


        webView.addJavascriptInterface(new WebAppInterface(this), "Android");

        WebView.setWebContentsDebuggingEnabled(true);

        webView.loadUrl("file:///android_asset/index.html");
    }
}
