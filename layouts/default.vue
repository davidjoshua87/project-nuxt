<template>
  <div>
    <header class="p-5 bg-white shadow-lg flex justify-between items-center">
          <nuxt-link to="/">InstagramClone</nuxt-link>
          <ul class="flex gap-3 items-center">
              <li>
                  <a href="/homes">Home</a>
              </li>
              <li>
                  <button class="p-3 bg-blue-500 text-white">
                      Log out
                  </button>
              </li>
          </ul>
    </header>
    <main class="w-1/2 mx-auto mt-5">
          <nuxt/>
    </main>
  </div>
</template>
