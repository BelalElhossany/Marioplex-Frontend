import { createLocalVue, shallowMount } from "@vue/test-utils";
import VueRouter from "vue-router";
import Vuex from "vuex";

import searchcomponent from "../../src/components/searchcomponent";

describe("searchcomponent", () => {
    let Wrapper;
    let store;
  //  const vm= Wrapper.vm;

    const localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(VueRouter);

    beforeEach(() => {
        store = new Vuex.Store({
            modules: {
                Search: {
                    namespaced: true,
                    state: {
                        search_Value: "",
                    },
                    getters: {
                        get_value(state) {
                            return state.search_Value;
                        },
                    },
                    actions:{
                        searchaboutartist:jest.fn(),
                        search_V:jest.fn()
                    }
                
                },
            },
        });
    });

    Wrapper = shallowMount(searchcomponent, {
        localVue,
        store,
        data() {
            return {
              Value: ''
            }
        },
         methods: {
            check:jest.fn(),
              reset:jest.fn()
         },
         
    });

    it("renders", () => {
        expect(Wrapper.exists()).toBe(true);
      });
      
    it("renders a vue instance", () => {
        expect(Wrapper.isVueInstance()).toBe(true);
    });
    
    it("the search icon apear",()=>{
        expect(Wrapper.find(".search_contaner").html()).toContain('<i class="fa fa-search hover"></i>')
    })

    it("when the input is empty the exit button don't appear ",()=>{
       let input_value= Wrapper.find("#search-box").text();
       expect(input_value).toBe("");
       expect(Wrapper.contains("button")).toBe(false);
    })

    it("when write the state change ",()=>{
        Wrapper.setData({ Value: "amr" });
        expect(Wrapper.vm.Value).toBe("amr");
    })

    it("when write on input field the exit button&&x appear",()=>{
        const textInput = Wrapper.find('#search-box')
        textInput.setValue('some value')
        expect(Wrapper.contains("button")).toBe(true);
        expect(Wrapper.find(".close").html()).toContain('<span aria-hidden=\"true\">×</span>');
    })
   
    it("when write on input the text change",()=>{
        const textInput = Wrapper.find('#search-box');
        textInput.setValue('some value');
        expect(Wrapper.vm.Value).toBe("some value");
    })

    it("when press on exite button it call reset and clear the input field",()=>{
        const textInput = Wrapper.find('#search-box');
        textInput.setValue('some value');
        const exitebutton=Wrapper.find('.close');
        exitebutton.trigger("click");
        expect("reset").toHaveBeenCalled;
        expect(textInput.text()).toBe("")
    })

    it("when press esc key it call reset and clear the input field",()=>{
        const textInput = Wrapper.find('#search-box');
        textInput.setValue('some value');
        textInput.trigger("keydown.esc");
        expect("reset").toHaveBeenCalled;
        expect(textInput.text()).toBe("")
    })

    it("when input field change it call check function to call disbatch",()=>{
        const textInput = Wrapper.find('#search-box');
        textInput.setValue('some value');
        textInput.trigger("change");
        expect("check").toHaveBeenCalled;
    })

});
