<template>
    <section>
        <slot name="title"></slot>
        <slot name="content"></slot>
        <div class="text-center mt-1 mb-1">
            <base-button type="primary" @click="$emit('finish')">
                <slot name="end"></slot>
            </base-button>
        </div>
    </section>
</template>
<script>

export default {
    name: "Announcement"
}
</script>
<style>

</style>