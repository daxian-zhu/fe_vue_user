<template>
    <div>
    <div></div>
    <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
            <Button type="primary" @click="addModel = true">添加</Button>
        </div>
    </div>  
    <Table border :loading="loading" :columns="teableHeader" :data="tableData" :no-data-text="this.$store.state.app.tableNodataText" >
        <template slot-scope="{ row }" slot="name">
            <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)" v-if="viewUserAccess">查看</Button>
            <Button type="error" size="small" @click="remove(index)" v-if="deleteUserAccess">删除</Button>
        </template>
    </Table>
    <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
            <Page :total="tableTotal" :current="currentPage" show-sizer show-total @on-change="changePage" @on-page-size-change="changePageSize" ></Page>
        </div>
    </div>
     <Modal
        v-model="addModel"
        title="添加用户"
        ok-text = "确定"
        cancel-text = "取消"
        :loading="addLoading"
        :mask-closable="false"
         class-name="vertical-center-modal"
        @on-ok="saveSubmit"
        @on-cancel="saveCancel">
      <Form :model="userInfo" :label-width="80">
        <FormItem label="用户名">
            <Input v-model="userInfo.userName" placeholder="请输入用户名称"/>
        </FormItem>
        <FormItem label="性别">
            <RadioGroup v-model="userInfo.sex">
                <Radio label="male">男</Radio>
                <Radio label="female">女</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="邮箱">
            <Input v-model="userInfo.email" placeholder="请输入用户邮箱"/>
        </FormItem>
    </Form>
    </Modal>
    </div>
</template>
<script>
    import { hasOneOf } from '@/libs/utils'
    import { saveUser,userList } from '@/api/user'
    import { mapMutations } from 'vuex'


    export default {
        data () {
            return {
                loading: true,
                teableHeader: [
                     {
                        title: '序号',
                        key: 'index',
                        fixed: 'left'
                    },
                    {
                        title: '名称',
                        key: 'userName',
                    },
                    {
                        title: '邮箱',
                        key: 'email'
                    },
                    {
                        title: '电话',
                        key: 'telephone'
                    },
                    {
                        title: '创建日期',
                        key: 'createDate'
                    },{
                        title: '登录状态',
                        key: 'loginStatus',
                    },{
                        title: '操作',
                        slot: 'action',
                        width: 150,
                        align: 'center',
                        fixed: 'right'
                    }],
                searchUser:{
                    page:1,
                    pageSize:50
                },
                tableData:[],
                tableTotal:0,
                currentPage:1,
                pageSize: 10,
                addModel: false,
                addLoading: true,
                userInfo:{
                    userName:"11",
                    email:"zz"
                },
            }
        },
        created() {
           this.createData(); 
        },
        methods: {
            ...mapMutations({
                setTotalNum: 'app/setTotalNum'
            }),
            saveSubmit(){
                saveUser(this.userInfo).then((res) => {
                   this.addModel = false;
                   this.tableData = this.createData(); 
                }).catch((error) => {
                   this.$Message.error(error.response.data.message);
                   //主要代码
                   this.addLoading = false;
                   this.$nextTick(() => {
                     this.addLoading = true;
                   });
                });
            },
            saveCancel(){
                this.addModel = false;
            },
            createData(){
                const searchParams = {};
                searchParams.page = this.currentPage;
                searchParams.pageSize =this.pageSize;
                userList(searchParams).then((res) => {
                    const arr = [];
                    const list = res.data.data.list;
                    list.map((item, index) => {
                        //转换数据
                        arr.push({
                            index: this.pageSize * (this.currentPage - 1) + (index + 1),
                            id: item.id,
                            userName: item.userName,
                            email: item.email,
                            telephone: item.telephone,
                            createDate: item.createDate,
                            loginStatus: this.$store.state.common.loginStatus[item.loginStatus===1?1:0].value,
                        });
                    });
                    this.tableData = arr;
                    this.tableTotal = res.data.data.total;
                    this.loading = false
                }).catch((error) => {
                    console.log(error)
                    // this.$Message.error(error.response.data.message);
                });   
            },
            changePage(current){
                this.currentPage = current;
                console.log(this.currentPage)
                this.createData();
            },
            changePageSize(pageSize){
                this.pageSize = pageSize;
                this.createData();
                console.log(this.pageSize)
            }
        },
        computed: {
            //获取权限数组
            access () {
                return this.$store.state.user.access
            },
            //判断是否有添加用户的权限
            addUserAccess () {
                return hasOneOf(['CENTER_USER_ADD'], this.access)
            },
            //判断是否有查看用户详情的权限
            viewUserAccess(){
                return hasOneOf(['CENTER_USER_VIEW'], this.access)
            },
            //判断是否删除用户的权限
            deleteUserAccess(){
                return hasOneOf(['CENTER_USER_DELETE'], this.access)
            }
        }
    }
</script>
<style lang="less">
    .vertical-center-modal{
        display: flex;
        align-items: center;
        justify-content: center;

        .ivu-modal{
            top: 0;
        }
    }
</style>
