export { default as AlertRight } from '../../components/AlertRight.vue'
export { default as BtnCreateNewForm } from '../../components/BtnCreateNewForm.vue'
export { default as Forms } from '../../components/Forms.vue'
export { default as Invite } from '../../components/Invite.vue'
export { default as SwitchVisibility } from '../../components/SwitchVisibility.vue'
export { default as TheHeader } from '../../components/TheHeader.vue'
export { default as Toolbar } from '../../components/Toolbar.vue'
export { default as ToolbarResponse } from '../../components/ToolbarResponse.vue'
export { default as AnswerCard } from '../../components/Answer/Card.vue'
export { default as HeaderSend } from '../../components/Header/Send.vue'
export { default as QuestionBtnAdd } from '../../components/Question/BtnAdd.vue'
export { default as QuestionBtnRemove } from '../../components/Question/BtnRemove.vue'
export { default as QuestionCard } from '../../components/Question/Card.vue'
export { default as QuestionDescription } from '../../components/Question/Description.vue'
export { default as QuestionInput } from '../../components/Question/Input.vue'
export { default as QuestionSelectType } from '../../components/Question/SelectType.vue'
export { default as QuestionSwitchRequired } from '../../components/Question/SwitchRequired.vue'
export { default as QuestionTitle } from '../../components/Question/Title.vue'
export { default as ResponseList } from '../../components/Response/List.vue'
export { default as ResponseSummary } from '../../components/Response/Summary.vue'
export { default as AnswerTypeCheckbox } from '../../components/Answer/Type/Checkbox.vue'
export { default as AnswerTypeDropdown } from '../../components/Answer/Type/Dropdown.vue'
export { default as AnswerTypeEmail } from '../../components/Answer/Type/Email.vue'
export { default as AnswerTypeRadio } from '../../components/Answer/Type/Radio.vue'
export { default as AnswerTypeText } from '../../components/Answer/Type/Text.vue'
export { default as QuestionTypeCheckbox } from '../../components/Question/Type/Checkbox.vue'
export { default as QuestionTypeDropdown } from '../../components/Question/Type/Dropdown.vue'
export { default as QuestionTypeEmail } from '../../components/Question/Type/Email.vue'
export { default as QuestionTypeRadio } from '../../components/Question/Type/Radio.vue'
export { default as QuestionTypeText } from '../../components/Question/Type/Text.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
