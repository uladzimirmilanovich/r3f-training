import { Shader, ShaderMaterial, ShaderMaterialParameters } from 'three';

interface Uniform<T> {
  value: T;
}

export class AnimatedShaderMaterial extends ShaderMaterial {
  _time: Uniform<number>;

  constructor(parameters: ShaderMaterialParameters = {}) {
    super(parameters);

    this.setValues(parameters);
    this._time = { value: 0 };
  }

  onBeforeCompile(shader: Shader) {
    shader.uniforms.time = this._time;
  }

  get time() {
    return this._time.value;
  }

  set time(value: number) {
    this._time.value = value;
  }
}
