<script setup>
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const subject = ref('')
const message = ref('')
const honeypot = ref('')

const loading = ref(false)
const success = ref(false)
const errorMessage = ref('')

const endpoint = import.meta.env.PUBLIC_CONTACT_ENDPOINT || '/api/contact'

async function submit() {
  loading.value = true
  success.value = false
  errorMessage.value = ''

  const formData = new FormData()
  formData.append('name', name.value)
  formData.append('email', email.value)
  formData.append('subject', subject.value)
  formData.append('message', message.value)
  formData.append('honeypot', honeypot.value)

  try {
    const response = await fetch(endpoint, { method: 'POST', body: formData })
    const data = await response.json()

    if (data.success) {
      success.value = true
      name.value = ''
      email.value = ''
      subject.value = ''
      message.value = ''
    } else {
      errorMessage.value = data.errors
        ? Object.values(data.errors).flat().join(', ')
        : 'Something went wrong. Please try again.'
    }
  } catch {
    errorMessage.value = 'Failed to send message. Please try again or email me directly.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form class="space-y-6" @submit.prevent="submit">
    <!-- Honeypot (hidden, spam protection) -->
    <div class="hidden" aria-hidden="true">
      <input v-model="honeypot" type="text" tabindex="-1" autocomplete="off" />
    </div>

    <div class="space-y-1.5">
      <label class="block text-sm font-medium text-foreground">Your Name</label>
      <input
        v-model="name"
        type="text"
        placeholder="Jane Doe"
        required
        autocomplete="name"
        class="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-foreground-muted focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-colors"
      />
    </div>

    <div class="space-y-1.5">
      <label class="block text-sm font-medium text-foreground">Email Address</label>
      <input
        v-model="email"
        type="email"
        placeholder="jane@example.com"
        required
        autocomplete="email"
        class="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-foreground-muted focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-colors"
      />
    </div>

    <div class="space-y-1.5">
      <label class="block text-sm font-medium text-foreground">Subject</label>
      <input
        v-model="subject"
        type="text"
        placeholder="What's it about?"
        autocomplete="off"
        class="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-foreground-muted focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-colors"
      />
    </div>

    <div class="space-y-1.5">
      <label class="block text-sm font-medium text-foreground">Message</label>
      <textarea
        v-model="message"
        placeholder="What's on your mind?"
        required
        rows="5"
        class="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-foreground-muted focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-colors resize-none"
      ></textarea>
    </div>

    <p v-if="success" class="text-sm text-success">
      Message sent! I'll get back to you soon.
    </p>
    <p v-if="errorMessage" class="text-sm text-error">{{ errorMessage }}</p>

    <button
      type="submit"
      :disabled="loading"
      class="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-brand-600 disabled:opacity-60 disabled:cursor-not-allowed"
    >
      <svg v-if="loading" class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
      {{ loading ? 'Sending…' : 'Send Message' }}
    </button>
  </form>
</template>
