import { HomeIcon, ConnectionsIcon } from "../components/icons";
import { A } from "@solidjs/router";

interface NavigationDrawerProps {
  isOpen?: boolean;
}

export function NavigationDrawer(_props: NavigationDrawerProps) {
  return (
    <div class="drawer-side">
      <label for="drawer" class="drawer-overlay"></label>
      <aside class="bg-base-200 w-80 min-h-full flex flex-col">
        {/* Sidebar content */}
        <div class="p-4">
          <h2 class="text-xl font-semibold mb-4">Bakery</h2>
        </div>

        <ul class="menu w-full p-4 flex-1 gap-2">
          <li class="w-full">
            <A
              href="/"
              class="w-full"
              activeClass="active !bg-primary text-primary-content"
              inactiveClass="hover:bg-base-300"
              end
            >
              <HomeIcon />
              Home
            </A>
          </li>
          <li class="w-full">
            <A
              href="/connections"
              class="w-full"
              activeClass="active !bg-primary text-primary-content"
              inactiveClass="hover:bg-base-300"
            >
              <ConnectionsIcon />
              Connections
            </A>
          </li>
        </ul>

        {/* User section at bottom */}
        <div class="border-t border-base-300">
          <div class="p-4">
            <div class="flex items-center gap-4">
              <div class="avatar placeholder">
                <div class="bg-neutral text-neutral-content rounded-full w-12">
                  <span>U</span>
                </div>
              </div>
              <div>
                <p class="font-medium">User Name</p>
                <p class="text-sm opacity-75">user@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
