import * as React from 'react';
import {Formik as FormikLib} from 'formik';
import {SafeAreaView, View, ViewProps} from 'react-native';
import {AppUtil} from 'core_app/common';
import {Schema} from 'src/portrait/form-validate/forms/Schema';
import Input from 'src/shared_controls/Input';
import {SchemaControl} from 'src/portrait/form-validate/forms/SchemaControl';
import {FormikProps} from 'formik/dist/types';
import * as yup from 'yup';
import {Text} from 'src/shared_controls/Text';
import Button from 'src/shared_controls/Button';

interface Props<T> extends ViewProps {
  schema: Schema<T>;
  cancel?: () => void;
  submit: (value: T) => Promise<void>;
  defaultValue?: T;
  layout?: number[][];
  submitTittle?: string;
}
interface State {
  isLoading: boolean;
}
export default class Formik<T> extends React.Component<Props<T>, State> {
  constructor(p: any) {
    super(p);
    this.state = {
      isLoading: false,
    };
    this.submit.bind(this);
  }

  private getSchema(): any {
    const controls: string[] = this.getControlNames();
    const schema: any = {};
    controls.forEach((key: string): void => {
      schema[key] = this.props.schema[key].schema;
    });
    return yup.object().shape(schema);
  }

  private initialValues(): T {
    if (!!this.props.defaultValue) {
      return this.props.defaultValue;
    }
    const keys: string[] = AppUtil.getProperties(this.props.schema);
    const value: any = {};
    keys.forEach((key: string): void => {
      value[key] = '';
    });
    return value;
  }

  private renderField(controlName: string, props: FormikProps<any>): any[] {
    const control: SchemaControl = this.props.schema[controlName];
    control['name'] = controlName;
    return [
      <Input
        key={controlName}
        {...control}
        disabled={this.state.isLoading}
        onChangeText={props.handleChange(controlName)}
        onBlur={props.handleBlur(`${control.name}`)}
        value={props.values[controlName]}
      />,
      props.errors[control.name] && (
        <Text style={{fontSize: 10, color: 'red'}}>
          {props.errors[control.name]}
        </Text>
      ),
    ];
  }

  private getControlNames(): string[] {
    const keys: string[] = AppUtil.getProperties(this.props.schema);
    return keys;
  }

  private getLayout(props: FormikProps<any>): any[] {
    const controlNames: string[] = this.getControlNames();

    if (!!this.props.layout && this.props.layout.length > 0) {
      let i: number = 0;
      let controls: number = 0;
      const rows: any[][] = [];
      for (let rowI: number = 0; rowI < this.props.layout.length; rowI += 1) {
        const row: any[] = [];
        for (
          let colI: number = 0;
          colI < this.props.layout[rowI].length;
          colI += 1
        ) {
          if (i <= controlNames.length) {
            break;
          }
          row.push(this.renderField(controlNames[i], props));
          controls += 1;
        }
        rows.push(row);
      }
      if (rows.length === 1) {
      }
    }

    return controlNames.map((name: string): any => {
      return <View style={{padding: 5}}>{this.renderField(name, props)}</View>;
    });
  }

  private submit = async (values: T): Promise<void> => {
    this.setState({isLoading: true});
    await this.props.submit(values);
    this.setState({isLoading: false});
  };

  private renderLayout(props: FormikProps<any>): any {
    return (
      <>
        {this.getLayout(props)}
        <View style={{paddingTop: 10}}>
          <Button
            key={'FormikSubmit'}
            isLoading={this.state.isLoading}
            style={{alignSelf: 'center', width: 100}}
            onPress={async (): Promise<void> => {
              props.handleSubmit();
            }}
            disabled={!props.isValid}>
            {!!this.props.submitTittle ? this.props.submitTittle : 'Submit'}
          </Button>
        </View>
      </>
    );
  }
  render() {
    return (
      <SafeAreaView
        {...this.props}
        style={[
          this.props.style,
          {
            borderColor: '#e8f3ea',
            padding: 10,
            elevation: 2,
            backgroundColor: '#ffffff',
            borderRadius: 10,
          },
        ]}>
        <FormikLib
          validationSchema={this.getSchema()}
          initialValues={this.initialValues()}
          onSubmit={this.submit}>
          {(props: FormikProps<any>): any => {
            return this.renderLayout(props);
          }}
        </FormikLib>
      </SafeAreaView>
    );
  }
}
