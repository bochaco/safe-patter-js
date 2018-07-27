import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Row, Col } from 'antd';
import Avatar from '../Avatar/Avatar';

const FormItem = Form.Item;

/**
 * Helper function for ant design forms to populate
 * the form with passed values.
 * @param  {Object} id post object
 */
const mapPropsToFields = ( { post } ) =>
{
    if ( !post ) return;

    return {
        content : Form.createFormField( {
            ...post,
            value : post.content || '',
        } )
    };
};

/**
 * Form for post creation/editing. Uses and design Form components (and form.create() method)
 * to create a form that can be easily validated/populated.
 * @extends React
 */
class PostForm extends React.Component
{
    handleSubmit = ( e ) =>
    {
        const { addPost, users, sendMessage } = this.props;

        e.preventDefault();
        this.props.form.validateFields( ( err, values ) =>
        {
            if ( !err )
            {
                const postToAdd = { ...values };
                const nowTimestamp = new Date();
                postToAdd.published = nowTimestamp.toISOString();

                console.log( 'Received values of form: ', values );
                addPost( users.webId, users.wallWebId, postToAdd );
            }
        } );
    }

    render = ( ) =>
    {
        const { getFieldDecorator } = this.props.form;

        return (
            <Form layout="vertical" onSubmit={ this.handleSubmit } style={{ border: '1px solid lightgray', padding: '5px', marginBottom: '30px'}}>
                <Row>
                    <FormItem style={{ margin: 0 }}>
                        {getFieldDecorator( 'summary', {
                            rules : [{ required: true, message: 'Please enter a summary' }],
                        } )( <Input disabled={ !this.props.users.webId }
                            // and icons removed as attempts to access a font online
                            // prefix={ <Icon type="user" style={ { color: 'rgba(0,0,0,.25)' } } /> }
                            placeholder="A summary..."
                        /> )}
                    </FormItem>
                    <FormItem style={{ margin: 0 }}>
                        {getFieldDecorator( 'content', {
                            rules : [{ required: true, message: 'Please enter some text!' }],
                        } )( <Input.TextArea disabled={ !this.props.users.webId }
                            // and icons removed as attempts to access a font online
                            // prefix={ <Icon type="user" style={ { color: 'rgba(0,0,0,.25)' } } /> }
                            placeholder="Something super important..."
                        /> )}
                    </FormItem>
                </Row>
                <Row>
                  <Col style={{ textAlign: 'right' }}>
                    <Button
                        htmlType="submit"
                        type="primary"
                        disabled={ !this.props.users.webId }
                    >
                      Post
                    </Button>
                  </Col>
                </Row>
            </Form>
        );
    }
}

const WrappedPostForm = Form.create( { mapPropsToFields } )( PostForm );

export default WrappedPostForm;
