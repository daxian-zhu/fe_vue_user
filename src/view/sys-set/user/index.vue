<template>
    <div>
    <Button style="margin: 10px 0;" type="primary" v-if="addUserAccess">添加</Button>
    <Table border :columns="columns12"  >
        <template slot-scope="{ row }" slot="name">
            <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)" v-if="viewUserAccess">View</Button>
            <Button type="error" size="small" @click="remove(index)" v-if="deleteUserAccess">Delete</Button>
        </template>
    </Table>
    </div>
</template>
<script>
    import { hasOneOf } from '@/libs/utils'
    export default {
        data () {
            return {
                columns12: [
                    {
                        title: '用户名',
                        slot: 'name'
                    },
                    {
                        title: '性别',
                        key: 'age'
                    },
                    {
                        title: '注册时间',
                        key: 'address'
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        width: 150,
                        align: 'center'
                    }
                ],
            }
        },
        methods: {
            show (index) {
                this.$Modal.info({
                    title: 'User Info',
                    content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
                })
            },
            remove (index) {
                this.data6.splice(index, 1);
            }
        },
        computed: {
            access () {
            return this.$store.state.user.access
            },
            addUserAccess () {
            return hasOneOf(['CENTER_USER_ADD'], this.access)
            },
            viewUserAccess(){
                return hasOneOf(['CENTER_USER_VIEW'], this.access)
            },
             deleteUserAccess(){
                return hasOneOf(['CENTER_USER_DELETE'], this.access)
            }
        }
    }
</script>
