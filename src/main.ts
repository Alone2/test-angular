import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { Plugins } from '@capacitor/core';

import { SystemNotification, SystemNotificationListener } from 'capacitor-notificationlistener';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));


const { PersistentNotification, App, BackgroundTask } = Plugins;

let receivedListener = null;

const sn = new SystemNotificationListener();

App.addListener('appStateChange', (state) => {
    if (!state.isActive) // App has gone inactive or closed
    {
        // Get some work done before the app closes completely.
        const taskId = BackgroundTask.beforeExit(async () => {
            try {
                await PersistentNotification.open({
                    title: 'Background Forever!',
                    body: 'We can run continuously!',
                });

                // See if the notification is open.
                const { isOpen } = await PersistentNotification.getState();

                console.log('Is open: ', isOpen);
            } catch(e) {
                console.log('Unable to start background service: ', e);
            }

            // Let the app close.
            BackgroundTask.finish({
                taskId
            });
        });

        // Now do your continuous background task.
        // Update the notification as necessary.

        sn.startListening();
        // check if start of listening succeeded
        sn.isListening().then((value: boolean) => {
          // if not listening
          if (!value) {
            console.log('no permission )=');
          } else if (receivedListener == null) {
            // listen for notification
            receivedListener = sn.addListener('notificationReceivedEvent', (info: SystemNotification) => {
              console.log('notificationReceivedEvent', info);
            });
          }
        });
        // waaaaaaiiiiittttt....
        let interval = 1;
        setInterval(() => {
            PersistentNotification.update(
              {body: `Seconds gone by: ${interval}`}
            );
            interval++;
        }, 1000);
    }
    else // App is now opening or resuming.
    {
        // OK to close un-opened notification.
        PersistentNotification.close().
            catch(e => {
                console.log('Trouble closing the persistent notification: ', e);
            });
    }
});
