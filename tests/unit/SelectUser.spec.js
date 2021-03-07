import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import SelectUser from "@/components/SelectUser";

describe("SelectUser", () => {
    it("Show no error message on default", () => {
        const wrapper = shallowMount(SelectUser);
        expect(wrapper.find(".error").isVisible()).toBe(false);
    })
    it("When a user does not exist, show an error", () => {
        const wrapper = shallowMount(SelectUser);
        expect(wrapper.find(".error").isVisible()).toBe(true);
    })
});