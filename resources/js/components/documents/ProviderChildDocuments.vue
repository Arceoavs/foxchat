<template>
    <b-col>
        <b-breadcrumb items:="items">
        </b-breadcrumb>
        <a v-text = "$ml.get('go_to_chat')" />
    </b-col>
</template>

<script>
export default {
    data(){
        return {
            items: [{
                text: "child",
                href: "/dokumente/provider/child",
            }]
        }
    }
}
</script>

