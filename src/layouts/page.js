import React from 'react';
import _ from 'lodash';

import {Layout} from '../components/index';
import {toStyleObj, withPrefix, htmlToReact, markdownify} from '../utils';

export default class Page extends React.Component {
    render() {
        return (
            <Layout {...this.props}>
              <article className="post post-full">
                <header className="post-header has-gradient outer">
                  {_.get(this.props, 'page.frontmatter.image', null) && (
                  <div className="bg-img" style={toStyleObj('background-image: url(\'' + withPrefix(_.get(this.props, 'page.frontmatter.image', null)) + '\')')}/>
                  )}
                  <div className="inner-sm">
                    <h1 className="post-title">{_.get(this.props, 'page.frontmatter.title', null)}</h1>
                    {_.get(this.props, 'page.frontmatter.subtitle', null) && (
                    <div className="post-subtitle">
                      {htmlToReact(_.get(this.props, 'page.frontmatter.subtitle', null))}
                    </div>
                    )}
                  </div>
                </header>
                <div className="inner-md outer">
                  <div className="post-content">
                    {markdownify(_.get(this.props, 'page.markdown', null))}
                  </div>
                </div>
              </article>
            </Layout>
        );
    }
}
