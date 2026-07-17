<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  name: string
  github?: string
  href?: string
  avatarSrc?: string
  avatarAlt?: string
  size?: number | string
}>()

const resolvedHref = computed(() => {
  if (typeof props.href === 'string' && props.href.trim()) {
    return props.href.trim()
  }

  if (typeof props.github === 'string' && props.github.trim()) {
    return `https://github.com/${props.github.trim()}`
  }

  return null
})

const resolvedAvatarSrc = computed(() => {
  if (typeof props.avatarSrc === 'string' && props.avatarSrc.trim()) {
    return props.avatarSrc.trim()
  }

  if (typeof props.github === 'string' && props.github.trim()) {
    return `https://github.com/${props.github.trim()}.png?size=80`
  }

  return null
})

const resolvedAvatarAlt = computed(() => {
  if (typeof props.avatarAlt === 'string' && props.avatarAlt.trim()) {
    return props.avatarAlt.trim()
  }

  if (typeof props.github === 'string' && props.github.trim()) {
    return `@${props.github.trim()}`
  }

  return props.name
})

const avatarSize = computed(() => {
  const size =
    typeof props.size === 'number'
      ? props.size
      : typeof props.size === 'string' && /^\d+(\.\d+)?$/.test(props.size.trim())
        ? Number(props.size.trim())
        : 30

  return `${size}px`
})
</script>

<template>
  <a v-if="resolvedHref" class="user-identity" :href="resolvedHref">
    <img
      v-if="resolvedAvatarSrc"
      class="user-identity-avatar"
      :src="resolvedAvatarSrc"
      :alt="resolvedAvatarAlt"
    />
    <span class="user-identity-name">{{ name }}</span>
  </a>
  <span v-else class="user-identity user-identity-static">
    <img
      v-if="resolvedAvatarSrc"
      class="user-identity-avatar"
      :src="resolvedAvatarSrc"
      :alt="resolvedAvatarAlt"
    />
    <span class="user-identity-name">{{ name }}</span>
  </span>
</template>

<style scoped>
.user-identity {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.45rem;
  width: fit-content;
  font-size: 0.95rem;
}

.user-identity-static {
  color: var(--vp-c-text-2);
}

.user-identity-avatar {
  width: v-bind(avatarSize);
  height: v-bind(avatarSize);
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 50%;
  flex: 0 0 auto;
}
</style>
