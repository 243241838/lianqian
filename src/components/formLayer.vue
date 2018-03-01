<template>
    <div v-if="isshow" style="position: fixed;top:0;left:0;bottom:0;right:0;margin:auto;background: rgba(0,0,0,0.2);">
      <form class="layui-form" style="position: fixed;top:0;left:0;bottom:0;right:0;margin:auto;width: 300px;height:240px;background: #fff;padding: 20px;">

        <div class="layui-form-item" style="margin:0;">
          <div class="layui-inline" style="display:inline-block;">

            <label class="layui-form-label" style="width:auto;">原因：</label>
            <div class="layui-input-inline">
              <select name="selectName" lay-filter="formLayerSelect">
                <option v-if="!selectData" value="" v-text=""></option>
                <option v-else v-for="item in selectData" :value="item.reasonId" v-text="item.reasonName"></option>
              </select>
            </div>

          </div>
        </div>

        <div class="layui-form-item">
          <div class="layui-inline" style="display:inline-block;width:100%;">

            <label class="layui-form-label" style="width:auto;">描述：</label>
            <div class="layui-input-inline" style="width: 100%;">
              <textarea style="width: 100%;" name="textareaName" placeholder="请输入内容" class="layui-textarea"></textarea>
            </div>

          </div>
        </div>

        <div class="layui-form-item" style="text-align:center;">
          <div class="layui-inline">

            <button class="layui-btn layui-btn-normal" lay-submit lay-filter="formLayerCommit">
              确认
            </button>
            <button type="reset" class="layui-btn layui-btn-primary" @click="$emit('reset')">
              取消
            </button>

          </div>
        </div>

      </form>
    </div>
</template>
<script>
import {verify, date, page, Common, checkbox} from 'js/layuiCommon';

export default {
  props: {
    isshow: {
      type: Boolean,
      default: false
    },
    selectData: {
      type: Array
    }
  },
  watch: {
    isshow () {
      if (this.isshow) {
        this.$nextTick(() => {
          this.form();
        })
      }
    }
  },
  mounted () {

  },
  methods: {
    form () {
      window.layui.use('form', () => {
        var form = window.layui.form();
        form.render();
      });
      verify.form('formLayerCommit', (data) => {
        this.$emit('formLayerCommit', data.field)
      })
    }
  }
};
</script>
<style lang="sass" scoped>

</style>

