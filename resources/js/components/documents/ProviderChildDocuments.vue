<template>
    <b-col>
        <b-breadcrumb items:="items">
        </b-breadcrumb>
        <a>go to chat</a>
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

