package io.ionic.starter;

import android.os.Bundle;

import com.flytesoft.persistent.notification.PersistentNotification;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;

import java.util.ArrayList;

import ch.asinz.capacitornotificationlistener.NotificationListenerPlugin;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // Initializes the Bridge
    this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
      // Additional plugins you've installed go here
      // Ex: add(TotallyAwesomePlugin.class);
      add(PersistentNotification.class);
      add(NotificationListenerPlugin.class);
    }});
  }
}
